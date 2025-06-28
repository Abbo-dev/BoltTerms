/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * Import function triggers from their respective submodules:
 */
require("dotenv").config();

const { setGlobalOptions } = require("firebase-functions");
const { onCall } = require("firebase-functions/v2/https");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const Stripe = require("stripe");
const admin = require("firebase-admin");
const { HttpsError } = require("firebase-functions/v2/https");
// Initialize Stripe with proper key sourcing

admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });
exports.health = onRequest((req, res) => res.send("OK"));

exports.createCheckoutSession = onCall(
  {
    secrets: ["STRIPE_SECRET_KEY"],
  },
  async (data, context) => {
    if (!context.auth) {
      throw new HttpsError(
        "unauthenticated",
        "You must be signed in to create a checkout session."
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    if (!data.stripePriceId) {
      throw new HttpsError(
        "invalid-argument",
        "The function must be called with a valid stripePriceId."
      );
    }
    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: data.stripePriceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url:
          "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
        cancel_url: "http://localhost:5173/cancel",
        metadata: {
          userId: context.auth.uid,
        },
      });
      return { sessionId: session.id };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new HttpsError("internal", "Error creating checkout session.");
    }
  }
);
