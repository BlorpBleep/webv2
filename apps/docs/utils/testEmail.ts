import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info@cicadavpn.com',
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendTestEmail() {
  const mailOptions = {
    from: 'info@cicadavpn.com',
    to: 'developer@cicadavpn.com', // Replace with your email
    subject: 'Test Email from Supabase',
    text: 'This is a test email to check if the Supabase email setup is working.',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Test email sent successfully.');
  } catch (error) {
    console.error('Error sending test email:', error);
  }
}

// Call the function to test email
sendTestEmail();