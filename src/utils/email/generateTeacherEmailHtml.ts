export const generateTeacherAccountEmailHTML = (
  teacherName: string,
  teacherEmail: string,
  generatedPassword: string,
): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Teacher Account Created</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f0f0f0;
        font-family: Arial, sans-serif;
      }

      .container {
        max-width: 600px;
        margin: 30px auto;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }

      .header {
        background-color: #4CA3BC;
        color: white;
        text-align: center;
        padding: 20px;
      }

      .content {
        padding: 30px 20px;
        color: #333;
      }

      .content p {
        line-height: 1.6;
      }

      .credentials-box {
        background-color: #e9f6f9;
        border: 1px solid #b8e1ec;
        border-radius: 6px;
        padding: 15px;
        margin: 20px 0;
      }

      .credentials-box li {
        margin-bottom: 8px;
      }

      .footer {
        padding: 20px;
        text-align: center;
        font-size: 14px;
        background-color: #f7f7f7;
        color: #555;
      }

      .signature {
        margin-top: 30px;
      }

      .italic {
        font-style: italic;
        margin-top: 10px;
        color: #666;
      }

      @media only screen and (max-width: 600px) {
        .container {
          width: 100% !important;
          margin: 10px auto !important;
          border-radius: 0;
        }

        .content {
          padding: 20px 15px;
        }
      }
    </style>
  </head>
  <body>
    <table class="container" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td class="header">
          <h2>Teacher Account Created</h2>
        </td>
      </tr>
      <tr>
        <td class="content">
          <p>Dear ${teacherName},</p>
          <p>Welcome to <strong>Babylon National School</strong>! Your teacher account has been successfully created.</p>
          <p><strong>Here are your login credentials:</strong></p>
          <div class="credentials-box">
            <ul style="padding-left: 20px; margin: 0;">
              <li><strong>Email:</strong> ${teacherEmail}</li>
              <li><strong>Password:</strong> ${generatedPassword}</li>
            </ul>
          </div>
          <p><strong>Please change your password after your first login for security purposes.</strong></p>

          <div class="signature">
            <p style="font-weight: bold; margin-bottom: 4px;">Babylon National School</p>
            <p style="font-size: 14px; margin: 0;">BalaBhadra Marga, Kathmandu, Nepal</p>
            <p style="font-size: 14px; margin: 0;">Phone: +977-1-4108905</p>
            <p style="font-size: 14px; margin: 0;">Email: info@babylonschool.edu.np</p>
            <p class="italic">"Educating for a brighter future"</p>
          </div>
        </td>
      </tr>
      <tr>
        <td class="footer">
          &copy; ${new Date().getFullYear()} Babylon National School. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
