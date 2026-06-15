'use client';
import useAuth from '@/hooks/useAuth';
import api from '@/lib/userNextAxios';
import Actions from '@/store/actions';
import { StoreContext } from '@/store/store-context';
import { useRouter } from 'next/navigation';
import { useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

 function AddToCart({ item }) {
  const { token } = useAuth();
  const [_, dispatch] = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const router = useRouter();

  const refreshPage = () => router.refresh();

  // Check if the item is in the cart - revised to properly check current item
  const checkCartStatus = useCallback(async () => {
    try {
      if (!item?.id || !token) return;
      
      setLoading(true);
      // Get all cart items
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/cartStartup`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if our specific item is in the cart
      if (response.status === 200 && response.data) {
        const cartItems = response.data.startupItems || response.data.data || [];
        
        // Check if item exists in cart using both possible ID fields
        const itemExists = cartItems.some(cartItem => {
          const cartItemId = cartItem.id || cartItem.startupId;
          const currentItemId = item.id || item.startupId;
          return cartItemId === currentItemId;
        });

        console.log('Cart check:', {
          cartItems,
          currentItem: item,
          isInCart: itemExists
        });

        setIsInCart(itemExists);
      } else {
        setIsInCart(false);
      }
    } catch (error) {
      console.error("Error checking cart status:", error);
      setIsInCart(false);
    } finally {
      setLoading(false);
    }
  }, [item, token]);

async function addToCartHandler() {
  try {
    if (loading || !item?.id) return;

    setLoading(true);

    const { status, data } = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/cartStartup`,
      { id: item.id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (status === 200) {
      setIsInCart(true);
      toast.success(data.message || "Added to cart successfully");
      dispatch({ type: Actions.CART_UPDATE_COUNT });
      await checkCartStatus();
      refreshPage();
    }

  } catch (error) {

    const message = error.response?.data?.message;

    if (message === "Startup registration already in cart") {
      setIsInCart(true);
      toast.info("Already added to cart");
    } else {
      toast.error(message || "Failed to add to cart");
    }

  } finally {
    setLoading(false);
  }
}

  // Remove item from cart
  async function removeFromCartHandler() {
    try {
      if (loading || !item?.id) return;
      
      setLoading(true);
      const { status, data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/cartStartup`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: item.id,
          },
        }
      );
      
      if (status === 200) {
        setIsInCart(false);
        toast.success(data.message || 'Successfully removed from cart');
        dispatch({ type: Actions.CART_UPDATE_COUNT });
        await checkCartStatus(); // Recheck cart status after removing
        refreshPage();
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error('Failed to remove item from cart');
    } finally {
      setLoading(false);
    }
  }

  // Check cart status when component mounts or item changes
  useEffect(() => {
    if (item && token) {
      checkCartStatus();
    }
  }, [item, token, checkCartStatus]);

  if (!token) {
    return (
      <button
        onClick={() => { /* DEV-OFF: router.push('/login') */ }}
        className="w-full bg-blue-600 text-white font-semibold rounded-xl py-2.5 hover:bg-blue-700 transition"
      >
        Sign in to add to cart
      </button>
    );
  }

  return (
    <>
      {!isInCart ? (
        <button
          onClick={addToCartHandler}
          disabled={loading}
          className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold rounded-xl py-2.5 hover:bg-blue-700 transition disabled:opacity-70"
          aria-label="Add to cart"
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
          className="w-full flex items-center justify-center bg-rose-600 text-white font-semibold rounded-xl py-2.5 hover:bg-rose-700 transition disabled:opacity-70"
          aria-label="Remove from cart"
        >
          {loading ? (
            <span className="inline-block w-4 h-4 border-white border-b-zinc-400 border-r-zinc-400 border-2 border-solid rounded-full animate-spin"></span>
          ) : (
            'Remove from Cart'
          )}
        </button>
      )}
    </>
  );
}

export default AddToCart;
