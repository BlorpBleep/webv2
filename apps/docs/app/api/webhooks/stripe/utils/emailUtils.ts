// File: apps/api/webhooks/stripe/utils/emailUtils.ts

import nodemailer from 'nodemailer';

// Initialize Nodemailer transporter with OAuth2 for enhanced security
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GMAIL_USER,
    clientId: process.env.GMAIL_CLIENT_ID,
    clientSecret: process.env.GMAIL_CLIENT_SECRET,
    refreshToken: process.env.GMAIL_REFRESH_TOKEN,
  },
});

/**
 * Send a general email notification to the customer.
 * @param recipientEmail - The customer's email address.
 * @param sessionId - The Stripe Checkout session ID.
 */
export async function sendEmailNotification(recipientEmail: string, sessionId: string) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipientEmail,
    subject: 'Payment Confirmation',
    text: `Thank you for your purchase! Your session ID is: ${sessionId}.`,
    html: `<p>Thank you for your purchase!</p><p>Your session ID is: <strong>${sessionId}</strong>.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email.');
  }
}

/**
 * Send a receipt email to the customer with the receipt link.
 * @param recipientEmail - The customer's email address.
 * @param receiptUrl - The URL to the receipt.
 */
export async function sendReceiptEmail(recipientEmail: string, receiptUrl: string) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipientEmail,
    subject: 'Your Purchase Receipt',
    text: `Thank you for your purchase! You can view your receipt here: ${receiptUrl}`,
    html: `<p>Thank you for your purchase!</p><p>You can view your receipt here: <a href="${receiptUrl}">Receipt</a>.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Receipt email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending receipt email:', error);
    throw new Error('Failed to send receipt email.');
  }
}