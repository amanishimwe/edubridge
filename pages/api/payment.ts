import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount, // amount in cents
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
