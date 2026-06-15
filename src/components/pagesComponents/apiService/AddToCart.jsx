'use client';

import { useState, useContext, useEffect } from 'react';
import { StoreContext } from '@/store/store-context';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Actions from '@/store/actions';
import axios from 'axios';
import UseAuth from '@/hooks/useAuth';

function AddToCart({ item, alreadyInCart: propAlreadyInCart, onCartStatusChange }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [internalAlreadyInCart, setInternalAlreadyInCart] = useState(false);
  const [state, dispatch] = useContext(StoreContext);
  const router = useRouter();
  const { token } = UseAuth();
  
  // Determine which cart status to use - prop or internal
  const alreadyInCart = propAlreadyInCart !== undefined ? propAlreadyInCart : internalAlreadyInCart;

  // Check cart status on component mount and when item changes
  useEffect(() => {
    if (token && item && propAlreadyInCart === undefined) {
      // Only check if we're not receiving the status as a prop
      checkCartStatus();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, token, propAlreadyInCart]);

  // Function to check if the item is in cart
  async function checkCartStatus() {
    if (!token || !item) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      
      if (response.status === 200 && response.data) {
        const cartItems = response.data.services || response.data.data || [];
        console.log("Cart items from API:", cartItems);
        console.log("Current item:", item);
        
        // Check if current item is in cart by comparing IDs
        const isInCart = cartItems.some(cartItem => 
          cartItem.id === item.id || 
          cartItem.serviceId === item.id ||
          cartItem.id === item.serviceId
        );
        
        console.log("Item in cart:", isInCart);
        setInternalAlreadyInCart(isInCart);
        
        // Update global cart state
        dispatch({ 
          type: Actions.API_CART, 
          payload: cartItems 
        });
      }
    } catch (err) {
      console.error('Error checking cart status:', err);
    } finally {
      setLoading(false);
    }
  }

  async function addToCartHandler() {
    try {
      if (!token) {
        // router.push('/login') // DEV-OFF;
        return;
      }

      if (alreadyInCart || !item) return;

      setLoading(true);
      setError('');

      const { data, status } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/cart`,
        item,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        // Update UI state immediately
        setInternalAlreadyInCart(true);
        
        // Notify parent component about the status change
        if (onCartStatusChange) {
          onCartStatusChange(true);
        }
        
        toast.success(data.message || 'Successfully added to cart');
        
        // Update cart count in global state
        dispatch({ type: Actions.CART_UPDATE_COUNT });
      } else {
        setError('Failed to add to cart');
        toast.error('Failed to add to cart');
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
      setError(err.response?.data?.message || 'Failed to add to cart');
      toast.error(err.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  }

  async function removeFromCartHandler() {
    try {
      if (!token || !item) return;

      setLoading(true);
      setError('');

      const { data, status } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cart`,
        {
          data: { serviceId: item.id }, // Correctly wrapped in an object
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === 200) {
        // Update UI state immediately
        setInternalAlreadyInCart(false);
        
        // Notify parent component about the status change
        if (onCartStatusChange) {
          onCartStatusChange(false);
        }
        
        toast.success(data.message || 'Successfully removed from cart');
        
        // Update cart count in global state
        dispatch({ type: Actions.CART_UPDATE_COUNT });
      } else {
        setError('Failed to remove from cart');
        toast.error('Failed to remove from cart');
      }
    } catch (err) {
      console.error('Error removing from cart:', err);
      setError(err.response?.data?.message || 'Failed to remove from cart');
      toast.error(err.response?.data?.message || 'Failed to remove from cart');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!alreadyInCart ? (
        <button
          onClick={addToCartHandler}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
          ) : (
            'Add to Cart'
          )}
        </button>
      ) : (
        <button
          onClick={removeFromCartHandler}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
          ) : (
            'Remove from Cart'
          )}
        </button>
      )}
      {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
    </>
  );
}

export default AddToCart;
