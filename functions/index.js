/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * Import function triggers from their respective submodules:
 */
"use strict";
const { setGlobalOptions } = require("firebase-functions");
const { onRequest, onCall } = require("firebase-functions/v2/https");
const Stripe = require("stripe");
const admin = require("firebase-admin");
const { HttpsError } = require("firebase-functions/v2/https");

const bodyParser = require("body-parser");
const express = require("express");

admin.initializeApp();

setGlobalOptions({
  maxInstances: 10,
});

// Convert to onRequest to properly handle CORS
const checkoutApp = express();
checkoutApp.use(bodyParser.json());

checkoutApp.post("/", async (req, res) => {
  try {
    console.log("=== CHECKOUT SESSION REQUEST ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    // Get the auth token from header
    const authToken = req.headers.authorization?.split("Bearer ")[1];
    if (!authToken) {
      console.log("No authorization token provided");
      return res.status(401).json({ error: "No authorization token provided" });
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = await admin.auth().verifyIdToken(authToken);
    } catch (authError) {
      console.error("Token verification failed:", authError);
      return res.status(401).json({ error: "Invalid authorization token" });
    }

    const userId = decodedToken.uid;
    console.log("Authenticated user:", userId);

    const { stripePriceId } = req.body;

    if (!stripePriceId) {
      console.log("No stripePriceId provided");
      return res.status(400).json({ error: "stripePriceId is required" });
    }

    console.log("=== STRIPE INITIALIZATION ===");
    console.log("STRIPE_SECRET_KEY exists:", !!process.env.STRIPE_SECRET_KEY);
    console.log(
      "STRIPE_SECRET_KEY starts with sk_:",
      process.env.STRIPE_SECRET_KEY?.startsWith("sk_")
    );

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15",
    });

    console.log("Creating Stripe checkout session...");
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url:
        "http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        userId: userId,
      },
    });

    console.log("Checkout session created:", session.id);
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("=== CHECKOUT SESSION ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    console.error("Stack trace:", error.stack);

    res.status(500).json({
      error: "Error creating checkout session: " + error.message,
    });
  }
});

exports.createCheckoutSession = onRequest(
  {
    secrets: ["STRIPE_SECRET_KEY"],
    region: "us-central1",
    cors: {
      origin: ["http://localhost:5173"], // Your frontend origin
      methods: ["POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  },
  checkoutApp
);
//Webhook handler for Stripe events
// This will handle the checkout.session.completed event to update user status in Firestore
const webhookApp = express();

// Middleware to parse raw body for Stripe webhook
webhookApp.use(express.raw({ type: "application/json" }));

webhookApp.post("/", async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      endpointSecret
    );
  } catch (error) {
    console.error("Error verifying webhook:", error.message, error.stack);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata.userId;
    const sessionId = session.id;
    console.log("Checkout session completed:", sessionId);
    console.log("User ID:", userId);

    try {
      const docRef = admin.firestore().collection("users").doc(userId);
      const docSnapshot = await docRef.get();

      if (!docSnapshot.exists) {
        console.error("No user ID found " + userId);
        return res.status(400).send("No user ID found in session metadata.");
      } else {
        // Update the user document in Firestore
        await docRef.update({
          isPaidUser: true,
        });
        console.log("User document updated successfully for user:", userId);
      }

      console.log("User document updated successfully.");
    } catch (error) {
      console.error("Error updating user document:", error);
      return res.status(500).send("Error updating user document.");
    }
  }

  res.status(200).send("Webhook received");
});

exports.stripeWebhook = onRequest(
  {
    secrets: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
    region: "us-central1",
    cors: {
      origin: true, // Allow all origins for webhook (Stripe needs this)
      methods: ["POST"],
      allowedHeaders: ["Content-Type", "stripe-signature"],
    },
  },
  webhookApp
);
exports.health = onCall(
  {
    region: "us-central1",
  },
  async (request) => {
    try {
      console.log("Health check request received");
      return { status: "ok" };
    } catch (error) {
      console.error("Health check error:", error);
      throw new HttpsError("internal", "Health check failed");
    }
  }
);
