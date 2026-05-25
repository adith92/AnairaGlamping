# Payment Gateway Injection Ready

## Overview
This document outlines the current state and future steps for injecting real Payment Gateway credentials into the Anaira Glamping system. Currently, the system is scaffolded and ready for injection, but operates in a safe mode.

## Current State
- **Manual QRIS / Transfer**: Fully ready for manual operation and demo purposes.
- **Midtrans**: Frontend scaffolded. Requires Server Key and Client Key to function.
- **Xendit**: Frontend scaffolded. Requires Secret Key and Callback Token to function.
- **DOKU / Indopay**: Planned integration.
- **UnionPay**: Available via payment gateway provider/acquirer.

## Security Rules for Injection
- ⚠️ **Secrets MUST stay backend-side**. Never expose Secret Keys, Server Keys, or API tokens in the frontend code.
- ⚠️ The Vercel static frontend (`frontend/hotelier`) is **NOT** where secret keys live.
- ⚠️ A Shared Hosting / VPS backend (using `api.php`) or Vercel Serverless API is required to safely handle payment generation and listen for webhooks.

## Callback URLs to Prepare
When setting up the real payment gateway dashboards, you must configure the following Webhook/Callback URLs pointing to your backend:
- `/api/webhooks/midtrans`
- `/api/webhooks/xendit`
