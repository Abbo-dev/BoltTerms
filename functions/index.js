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

//Webhook handler for Stripe events
// This will handle the checkout.session.completed event to update user status in Firestore

// Handle the Stripe webhook
// This endpoint will be called by Stripe when an event occurs

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
