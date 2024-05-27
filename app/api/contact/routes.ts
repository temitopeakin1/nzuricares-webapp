import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import https from "https";

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const axiosInstance = axios.create({
  httpsAgent: agent,
});

export async function POST(req: NextRequest, res: NextResponse) {
  const { fullName, email, phoneNumber, message, subject } = await req.json();
  const postmarkServerToken = process.env.POSTMARK_SERVER_TOKEN;

  console.log("fullname: ", fullName);

  try {
    const response = await axiosInstance.post(
      "https://api.postmarkapp.com/email",
      {
        From: "support@nzuricares.co.uk",
        To: "info@nzuricares.co.uk",
        Subject: subject || "Message from Nzurihealthcare Contact Form",
        TextBody: `You've got a new mail from ${fullName}, their email is: ${email}`,
        HtmlBody: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>NzurihealthCare</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f7f7f7;
                    margin: 0;
                    padding: 0;
                }
        
                .container {
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin: 20px;
                    padding: 20px;
                }
        
                h3 {
                    color: #333333;
                    font-size: 24px;
                    margin: 0 0 20px;
                }
        
                p {
                    color: #666666;
                    font-size: 16px;
                    margin: 0 0 10px;
                }
        
                strong {
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
        <div class="container">
            <h3>You've got a new mail from ${fullName}, their email is: ✉️${email} </h3>
            <div>
                <p>Message:</p>
                <p><strong>Phone Number:</strong> ${phoneNumber}</p>
                <p><strong>Message:</strong> ${message}</p>
            </div>
        </div>
        </body>
        </html>
        `,
        MessageStream: "outbound",
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Postmark-Server-Token": postmarkServerToken,
        },
      }
    );

    // Return success response
    return Response.json(response);
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("Errorttt:", error);

    // Return appropriate error response
    return Response.json(error);
  }
}
