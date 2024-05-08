const userSeaTemplate = () => {
  return `<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Query Registration Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        text-align: center;
        color: #333;
      }
      p {
        line-height: 1.6;
        color: #666;
      }
      .signature {
        margin-top: 20px;
        font-style: italic;
        color: #999;
      }
    </style>
    </head>
    <body>
    <div class="container">
      <h1>Query Registration Confirmation</h1>
      <p>Your query has been successfully registered. We will get back to you as soon as possible.</p>
      <p>Thank you for reaching out!</p>
      
    </div>
    </body>
    </html>
    `;
};

module.exports = userSeaTemplate;
