/* import { FormEvent, useEffect, useState } from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Load Stripe with your public key
const stripePromise = loadStripe("pk_test_51QSO34P3n1RfUKI19NnY3HUVUcrDZTGR8UjfquTIvJPAXXBZu3GEVn7kehF5n7PTX91v8pFkKDFrlhlzCXfFaIvi00YuSgdh99");

const CheckOutForm = () => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const [clientSecret, setClientSecret] = useState("");

    const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsProcessing(true);

        try {
            const response = await axios.post("http://localhost:4000/api/v1/payment/create", {
                amount: 5090,
            });
            setClientSecret(response.data.clientSecret);
        } catch (error) {
            console.error("Error creating payment intent:", error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="checkout-container">
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button disabled={isProcessing}>
                    {isProcessing ? "Processing ..." : "Pay"}
                </button>
            </form>
        </div>
    );
};

const Checkout = () => {
    const [clientSecret, setClientSecret] = useState<string | null>(null);

    useEffect(() => {
        // Simulate fetching the clientSecret from the server
        const fetchClientSecret = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/v1/payment/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount: 5090 }), // Example amount
                });
                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error("Error fetching clientSecret:", error);
            }
        };

        fetchClientSecret();
    }, []); // Run only once on component mount

    if (!clientSecret) {
        return <div>Loading...</div>;
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckOutForm />
        </Elements>
    );
};


export default Checkout
 */

import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { NewOrderRequest } from "../types/api-types";
import { useSelector } from "react-redux";
import { useNewOrderMutation } from "../redux/api/orderAPI";
import { resetCart } from "../redux/reducer/cartReducer";
import { responseToast } from "../utils/features";
import { useDispatch } from "react-redux";
import { RootState } from "../redux/store";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY)

const CheckOutForm = () => {
    const  stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state : RootState) => state.userReducer)

    const {
        shippingInfo, 
        cartItems,
        subtotal,
        tax,
        discount,
        shippingCharges,
        total,
    } = useSelector((state: RootState) => state.cartReducer)

    const [isProcessing, setIsProcessing] = useState<boolean> (false)

    const [newOrder] = useNewOrderMutation()

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!stripe || !elements)
            return setIsProcessing(true)

        const orderData: NewOrderRequest = {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges,
            total,
            user: user?._id!

        }

        // setTimeout(() => {
        //     setIsProcessing(false)
        // }, 2000)
        const {paymentIntent, error} = await stripe.confirmPayment({
            elements, 
            confirmParams:{return_url:window.location.origin},
            redirect:"if_required",
        })

        if(error)
        {
            setIsProcessing(false)
            return toast.error(error.message || "Something Went Wrong")
        }

        if(paymentIntent.status === "succeeded"){
            const res = await newOrder(orderData)
            dispatch(resetCart())
            responseToast(res, navigate, "/orders")
        }
        setIsProcessing(false)
    }
    return (

        <div className="checkout-container">
            <form onSubmit={submitHandler}>
                <PaymentElement />
                <button type="submit" disabled={isProcessing}> {isProcessing ? "Processing": "Pay"} </button>
            </form>
        </div>
    )
}

const Checkout = () => {

    const location = useLocation()

    const clientSecret: string | undefined = location.state

    if(!clientSecret)
        return <Navigate to={"/shipping"} />

    return (
        <Elements 
            options={{
                clientSecret: clientSecret,
            }}
            stripe={stripePromise}
            >
                <CheckOutForm />
            </Elements>
    )
}

export default Checkout