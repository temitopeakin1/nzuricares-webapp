// pages/api/sendFormSubmissionEmail.js

import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import sgMail from '@sendgrid/mail';

// Initialize Supabase client
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_API_KEY');

// Initialize SendGrid with your API key
sgMail.setApiKey('YOUR_SENDGRID_API_KEY');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Parse the form submission data from the request body
      const formData = req.body;

      // Save form submission to the database (if needed)
      // ...

      // Send email notification to the admin
      const msg = {
        to: 'info@nzuricares.co.uk', // Admin's email address
        from: 'noreply@nzuricares.co.uk', // Sender's email address
        subject: 'New Form Submission',
        text: `A new form submission was received:\n\n${JSON.stringify(formData, null, 2)}`,
      };

      await sgMail.send(msg);

      res.status(200).json({ message: 'Email notification sent to admin' });
    } catch (error) {
      console.error('Error handling form submission:', error);
      res.status(500).json({ error: 'Error handling form submission' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
