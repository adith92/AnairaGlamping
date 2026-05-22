# Payment Gateway Setup

## Scope

Payment gateway configuration is not handled by Vercel. Vercel only serves the static Hotelier frontend from `frontend/hotelier`.

Real payments belong in the QloApps PHP backend and Back Office after the backend is installed on shared hosting or a VPS.

## QloApps Admin Path

After backend installation, configure payment modules from:

```text
Back Office -> Modules -> Payment -> Configure
```

## Required Sandbox Credentials

Do not commit these credentials to Git.

- Midtrans server key and client key
- Xendit secret key and callback token
- DOKU credentials after official docs/config are available
- Indopay/custom acquirer credentials only after official docs are available

## Manual QRIS

Manual QRIS should be configured as an image path and clear instruction text in the backend module settings.

Example path:

```text
/img/qris-anaira.png
```

## Webhook Callback URLs

Use HTTPS callback URLs on the backend domain, not the Vercel static frontend domain.

Example formats:

```text
https://backend-domain.example/module/midtranspayment/validation
https://backend-domain.example/module/xenditpayment/validation
https://backend-domain.example/module/anairamultipayment/webhook
```

## Sandbox Test Checklist

- Enable sandbox mode in each module.
- Create a booking/order with a known amount.
- Start a Midtrans Snap/QRIS payment and verify callback signature.
- Create a Xendit invoice and verify `x-callback-token`.
- Send duplicate callback and confirm idempotency.
- Send wrong amount callback and confirm it is rejected.
- Confirm logs never expose full API keys or callback tokens.

## Production Checklist

- Switch environment to production only after sandbox is complete.
- Verify HTTPS and final backend callback URLs.
- Configure production keys in QloApps Back Office only.
- Reconcile paid orders daily during launch.
- Keep DOKU, Indopay, and UnionPay direct flows disabled until official provider docs and sandbox tests are complete.
