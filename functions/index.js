/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * Import function triggers from their respective submodules:
 */
"use strict";
const { setGlobalOptions } = require("firebase-functions");
const { onCall } = require("firebase-functions/v2/https");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const Stripe = require("stripe");
const admin = require("firebase-admin");
const { HttpsError } = require("firebase-functions/v2/https");

const bodyParser = require("body-parser");
const express = require("express");

// Initialize Stripe with proper key sourcing

admin.initializeApp();

setGlobalOptions({ maxInstances: 10 });
exports.health = onRequest((req, res) => res.send("OK"));

exports.createCheckoutSession = onCall(
  {
    secrets: ["STRIPE_SECRET_KEY"],
    region: "us-central1", // Adjust the region as needed
  },
  async (data, context) => {
    // Check if the user is authenticated
    if (!context || !context.auth) {
      logger.error("Unauthenticated request");
      throw new HttpsError(
        "unauthenticated",
        "You must be signed in to create a checkout session."
      );
    }
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

const app = express();

// Middleware to parse raw body for Stripe webhook
app.use(bodyParser.raw({ type: "application/json" }));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/stripeWebhook", async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      endpointSecret
    );
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const sessionId = session.id;
    console.log("Checkout session completed:", sessionId);
    console.log("User ID:", userId);

    try {
      if (!userId) {
        console.error("No user ID found in session metadata.");
        return res.status(400).send("No user ID found in session metadata.");
      }
      await admin.firestore().collection("users").doc(userId).update({
        lastPaymentSessionId: sessionId,
        lastPaymentDate: admin.firestore.FieldValue.serverTimestamp(),
        isPaidUser: true,
      });
      console.log("User document updated successfully.");
    } catch (error) {
      console.error("Error updating user document:", error);
      return res.status(500).send("Error updating user document.");
    }
  }
});

exports.stripeWebhook = functions.onRequest(app);
