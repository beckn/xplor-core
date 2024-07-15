// Defines the supported payment gateway types that the application can interact with.
export enum GatewayType {
  // Represents the Razorpay payment gateway, used for processing payments via Razorpay.
  RazorPay = 'razorpay',

  // Represents the Stripe payment gateway, used for processing payments via Stripe.
  Stripe = 'stripe',
}
