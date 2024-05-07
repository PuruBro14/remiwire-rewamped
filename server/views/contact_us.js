const contactUsTemplate = async (email, subject, message) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${subject}</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    
      <table style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <tr>
          <td style="padding: 30px;">
            <h1 style="color: #333;">Thank You for Contacting Us!</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">Dear <strong>User</strong>,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">We received your message and we will get back to you as soon as possible.</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">Here are the details of your inquiry:</p>
            <ul style="font-size: 16px; line-height: 1.6; color: #555;">
            
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">Thank you for reaching out to us!</p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">Best regards,<br>Your Team</p>
          </td>
        </tr>
      </table>
    
    </body>
    </html>
    `;
};

module.exports = contactUsTemplate;
