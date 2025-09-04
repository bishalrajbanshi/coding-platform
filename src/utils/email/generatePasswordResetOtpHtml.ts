export const generatePasswordResetOTPEmailHTML = (
  teacherName: string,
  otpCode: string,
): string => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset OTP</title>
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

      .otp-box {
        background-color: #e9f6f9;
        border: 1px solid #b8e1ec;
        border-radius: 6px;
        padding: 20px;
        margin: 20px 0;
        text-align: center;
        font-size: 24px;
        font-weight: bold;
        color: #4CA3BC;
        letter-spacing: 4px;
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

        .otp-box {
          font-size: 20px;
        }
      }
    </style>
  </head>
  <body>
    <table class="container" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td class="header">
          <h2>Password Reset Request</h2>
        </td>
      </tr>
      <tr>
        <td class="content">
          <p>Dear ${teacherName},</p>
          <p>We received a request to reset your password for your <strong>Babylon National School</strong> teacher account.</p>
          <p>Please use the following OTP (One-Time Password) to proceed with resetting your password:</p>
          <div class="otp-box">${otpCode}</div>
          <p>This OTP is valid for the next 5 minutes. Do not share it with anyone.</p>
          <p>If you did not request a password reset, please ignore this email.</p>

          <div class="signature">
            <p style="font-weight: bold; margin-bottom: 4px;">Babylon National School</p>
            <p style="font-size: 14px; margin: 0;"> BalaBhadra Marga, Kathmandu, Nepal</p>
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
