"use client";

import { createCheckoutSession } from "@/actions/stripeActions";
import { useProductContext } from "@/components/Layout/ProductContext";
import {
	EmbeddedCheckout,
	EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Checkout() {
	const router = useRouter();
	const stripePromise = loadStripe(
		process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
	);
	const [options, setOptions] = useState("");
	const { cartItems, customerData } = useProductContext();

	async function fetchClientSecret() {
		const session = await createCheckoutSession(cartItems, customerData);
		setOptions(session); // clientSecret: checkoutSession.client_secret
	}

	useEffect(() => {
		if (cartItems.length === 0 || !customerData?.id) {
			router.push("/");
		} else {
			fetchClientSecret();
		}
	}, [cartItems.length, customerData?.id]);

	return (
		<div>
			{options && (
				<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
					<div className="my-10">
						<EmbeddedCheckout />
					</div>
				</EmbeddedCheckoutProvider>
			)}
		</div>
	);
}
