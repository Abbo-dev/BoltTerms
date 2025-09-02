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

const express = require("express");

admin.initializeApp();

setGlobalOptions({
  maxInstances: 10,
});

// Convert to onRequest to properly handle CORS
const checkoutApp = express();
checkoutApp.use(express.json());

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
        "https://www.boltterms.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://www.boltterms.com/cancel",
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
      origin: [
        "http://localhost:5173",
        "https://www.boltterms.com",
        "https://boltterms.com",
      ], // Your frontend origin
      methods: ["POST", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  },
  checkoutApp
);
//Webhook handler for Stripe events
// This will handle the checkout.session.completed event to update user status in Firestore

// Handle the Stripe webhook
// This endpoint will be called by Stripe when an event occurs

exports.stripeWebhook = onRequest(
  {
    secrets: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
    region: "us-central1",
  },
  async (req, res) => {
    console.log("=== WEBHOOK REQUEST DEBUG ===");
    console.log("Method:", req.method);
    console.log("Headers:", Object.keys(req.headers));
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("Body type:", typeof req.body);
    console.log("Body is Buffer:", Buffer.isBuffer(req.body));
    console.log("Raw body type:", typeof req.rawBody);
    console.log("Raw body is Buffer:", Buffer.isBuffer(req.rawBody));

    // Check if the request method is POST
    // Stripe webhooks should only be POST requests
    if (req.method !== "POST") {
      return res.status(405).send("Method Not Allowed");
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
      const rawBody = req.rawBody || req.body;
      if (!rawBody) {
        console.error("No raw body found in request");
        return res.status(400).send("No raw body found in request.");
      }
      if (!endpointSecret) {
        console.error("STRIPE_WEBHOOK_SECRET is not set");
        return res.status(500).send("Webhook secret not configured.");
      }

      const signature = req.headers["stripe-signature"];

      if (!signature) {
        console.error("No Stripe signature header found");
        return res.status(400).send("No Stripe signature header found.");
      }

      event = stripe.webhooks.constructEvent(
        rawBody,
        signature,
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
        }
        console.log("User document found:", docSnapshot.id);
        // Update the user document to set isPaidUser to true
        await docRef.update({
          isPaidUser: true,
        });

        console.log("User document updated successfully." + userId);
      } catch (error) {
        console.error("Error updating user document:", error);
        return res.status(500).send("Error updating user document.");
      }
    }

    res.status(200).send("Webhook received");
  }
);

// Health check function to ensure the service is running
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
