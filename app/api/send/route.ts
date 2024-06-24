import { Resend } from 'resend';
import * as React from 'react';
import EmailTemplate from '@/Components/EmailTemplate'; // Adjust path as per your project structure

const resend = new Resend(process.env.RESEND_API_KEY);

// Example function to fetch recipient's first name
function fetchRecipientFirstName(): string {
  return ''; // Example value, replace with your logic
}

export async function POST() {
  try {
    const recipientEmail = 'user@example.com';
    const recipientFirstName = fetchRecipientFirstName(); // Call function to fetch recipient's first name

    const { data, error } = await resend.emails.send({
      from: 'Nzurihealthcare <noreply@nzuricares.co.uk>',
      to: [recipientEmail],
      subject: "Welcome to Nzuri Health Care",
      react: EmailTemplate({ firstName: recipientFirstName }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
