import Razorpay from 'razorpay';

// Initialize Razorpay
export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Create order
export const createOrder = async (amount) => {
  try {
    const response = await fetch('/api/razorpay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount * 100, // Convert to paise
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Make payment
export const makePayment = async (amount, orderData) => {
  const res = await initializeRazorpay();

  if (!res) {
    alert('Razorpay SDK Failed to load');
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: amount * 100,
    currency: 'INR',
    name: 'iTaxEasy',
    description: 'Payment for services',
    order_id: orderData.id,
    handler: function (response) {
      // Handle successful payment
      console.log(response);
      // You can make an API call here to verify the payment on your backend
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    theme: {
      color: '#2563EB',
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}; 
