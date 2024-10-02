
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

// Send email notification to the customer
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
