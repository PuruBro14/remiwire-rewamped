const adminBlockedAccount = (userInfo) => {
  console.log("sadsad=> ", userInfo);
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>User Inquiry Details</title>
      <!-- Add your CSS styles or link to a CSS file here -->
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 1200px;
          margin: 20px auto;
          padding: 20px;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
        }
        h1 {
          text-align: center;
        }
        .message {
          margin-bottom: 20px;
          padding: 10px;
          background-color: #f0f8ff;
          border-left: 5px solid #1e90ff;
        }
        .user-details {
          margin-bottom: 20px;
        }
        .user-details h2 {
          margin-bottom: 10px;
        }
        .user-details table {
          width: 100%;
          border-collapse: collapse;
        }
        .user-details th, .user-details td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }
        .user-details th {
          background-color: #f4f4f4;
          text-align: left;
        }
    
        @media only screen and (max-width: 768px) {
          .container {
            padding: 10px;
          }
          .message, .user-details {
            margin-bottom: 10px;
          }
          .user-details table {
            font-size: 14px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>User Edication loan inquiry</h1>
        <div class="message">
          <p>Hello Admin,</p>
          <p>You have a new user inquiry. Below are the details:</p>
        </div>
        <div class="user-details">
          <h2>User Details</h2>
          <table>
            <tr>
              <th>Full Name</th>
              <td>${userInfo.firstName} ${userInfo.lastName}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>${userInfo.email}</td>
            </tr>
            <tr>
              <th>Mobile Number</th>
              <td>${userInfo.mobileNumber}</td>
            </tr>
            <tr>
              <th>Study Country</th>
              <td>${userInfo.studyCountry}</td>
            </tr>
            <tr>
              <th>Institute Name</th>
              <td>${userInfo.instituteName}</td>
            </tr>
            <tr>
              <th>Course Name</th>
              <td>${userInfo.courseDetails}</td>
            </tr>
            <tr>
              <th>Parent Name</th>
              <td>${userInfo.parentName}</td>
            </tr>
            <tr>
              <th>Parent Mobile</th>
              <td>${userInfo.parentMobile}</td>
            </tr>
          </table>
        </div>
      </div>
    </body>
    </html>
    `;
};

module.exports = adminBlockedAccount;
