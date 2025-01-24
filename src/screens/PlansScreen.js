import React, { useEffect, useState } from 'react'
import './PlansScreen.css'
import db from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);
    const [subscription, setSubscription] = useState(null)

    useEffect(() => {
        if (!user?.id) {
          console.error("User is not authenticated");
          return;
        }
      
        const fetchSubscriptionDetails = async () => {
          try {
            const subscriptionsSnapshot = await db
              .collection('customers')
              .doc(user.id)
              .collection('subscriptions')
              .get();
      
            if (subscriptionsSnapshot.empty) {
              console.log("No subscriptions found for user.");
              setSubscription(null);
              return;
            }
      
            subscriptionsSnapshot.forEach(async (subscriptionDoc) => {
              const subscriptionData = subscriptionDoc.data();
              console.log("Full Subscription Document Data:", subscriptionData);
      
              const items = subscriptionData.items || [];
              items.forEach(async (item) => {
                console.log("Processing Item:", item);
      
                const plan = item.plan || {};
                const price = item.price || {};
                const product = price.product || {};
      
                console.log("Plan Details:", plan);
                console.log("Price Details:", price);
                console.log("Product Details:", product);
      
                const productName = product.name || "No name available";
      
                setSubscription({
                  role: productName, 
                  status: subscriptionData.status,
                  current_period_start: subscriptionData.current_period_start?.seconds || null,
                  current_period_end: subscriptionData.current_period_end?.seconds || null,
                  fullInfo: {
                    base: subscriptionData,
                    plan,
                    price,
                    product,
                  },
                });
              });
            });
          } catch (error) {
            console.error("Error fetching subscription details:", error);
          }
        };
      
        fetchSubscriptionDetails();
      }, [user?.id]);

    console.log("User:", user);
    useEffect(() => {
        db.collection('products')
        .where('active','==',true)
        .get().then(querySnapshot => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const priceSnap = await productDoc.ref.collection('prices')
                .get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            })
            setProducts(products);
        })
    }, [])

    console.log(products)
    console.log(subscription)

    const loadCheckout = async (priceId) => {
        console.log('PriceId:', priceId); 
        if (!priceId) {
          console.error('Invalid priceId');
          return;
        }
    
        if (!user || !user.id) {
          console.error('User is not authenticated or user.id is missing');
          return;
        }
    
        try {
          const docRef = await db
            .collection('customers')
            .doc(user.id) 
            .collection('checkout_sessions')
            .add({
              price: priceId,
              success_url: window.location.origin,
              cancel_url: window.location.origin,
            });
    
          // Listen for changes to the checkout session document
          docRef.onSnapshot(async (snap) => {
            const { error, sessionId } = snap.data();
    
            if (error) {
              console.error(`An error occurred: ${error.message}`);
              alert(`An error occurred: ${error.message}`);
              return;
            }
    
            if (sessionId) {
              const stripe = await loadStripe('pk_test_51QkbBeJqQ2wMDQFQO5SW4mSTOnqsgpTAN1yIeOwpfMseq2zw6rTueCu1kZLfKYDaNhladAoXcyPBX8EgHv0vQFbL00MSnsge1P');
              if (!stripe) {
                console.error('Failed to initialize Stripe');
                return;
              }
              stripe.redirectToCheckout({ sessionId });
            }
          });
        } catch (error) {
          console.error('Error creating checkout session:', error);
        }
      };

  return (
    <div className="plansScreen">
        {subscription && <p>Renewal date:{" "}
        {new Date(subscription?.current_period_end * 1000)
        .toLocaleDateString()}</p>}
    {Object.entries(products).map(([productId, productData]) => {
        // Check if the current product matches the user's subscription role
        const isCurrentPackage = subscription?.role === productData.name;

        return (
        <div key={productId} className={`${isCurrentPackage &&"plansScreen__plan--disabled"

        } plansScreen__plan`}>
            <div className="plansScreen__info">
            <h5>{productData.name}</h5>
            <h6>{productData.description}</h6>
            </div>
            <button
                onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}
                disabled={isCurrentPackage} // Disable button if it's the current package
            >
            {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
        </div>
        );
    })}
    </div>
  )
}

export default PlansScreen