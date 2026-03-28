// utils/emailTemplates.js
export const getVerificationEmailTemplate = (name, verificationUrl) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #1f2937;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 40px 20px;
        }
        
        .container {
          max-width: 560px;
          margin: 0 auto;
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .header {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          padding: 48px 32px;
          text-align: center;
          position: relative;
        }
        
        .logo {
          font-size: 48px;
          margin-bottom: 16px;
        }
        
        .header h1 {
          color: white;
          font-size: 28px;
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.5px;
        }
        
        .header p {
          color: rgba(255, 255, 255, 0.9);
          margin-top: 8px;
          font-size: 16px;
        }
        
        .content {
          padding: 40px 32px;
        }
        
        .greeting {
          font-size: 24px;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 16px;
        }
        
        .message {
          color: #4b5563;
          margin-bottom: 32px;
          font-size: 16px;
          line-height: 1.7;
        }
        
        .button-container {
          text-align: center;
          margin: 32px 0;
        }
        
        .button {
          display: inline-block;
          padding: 14px 32px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          text-decoration: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 16px;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        .button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
        }
        
        .info-box {
          background: #f0fdf4;
          border-left: 4px solid #10b981;
          padding: 16px 20px;
          border-radius: 12px;
          margin: 24px 0;
        }
        
        .info-box strong {
          color: #10b981;
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        .info-box p {
          color: #374151;
          font-size: 14px;
          margin: 0;
        }
        
        .fallback-link {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid #e5e7eb;
        }
        
        .fallback-link p {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
        }
        
        .fallback-link a {
          word-break: break-all;
          font-size: 12px;
          color: #10b981;
          text-decoration: none;
        }
        
        .footer {
          background: #f9fafb;
          padding: 24px 32px;
          text-align: center;
          border-top: 1px solid #e5e7eb;
        }
        
        .footer p {
          color: #6b7280;
          font-size: 12px;
          margin: 4px 0;
        }
        
        .social-links {
          margin-top: 16px;
        }
        
        .social-links a {
          color: #9ca3af;
          text-decoration: none;
          margin: 0 8px;
          font-size: 12px;
        }
        
        @media (max-width: 480px) {
          .container {
            border-radius: 16px;
          }
          
          .header {
            padding: 32px 24px;
          }
          
          .content {
            padding: 32px 24px;
          }
          
          .greeting {
            font-size: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🌾</div>
          <h1>AgriFarm</h1>
          <p>Connecting Farmers with Buyers</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Hello ${name}! 👋
          </div>
          
          <div class="message">
            Thanks for joining AgriFarm! We're excited to have you on board. 
            Please verify your email address to get started and unlock all the features of our platform.
          </div>
          
          <div class="button-container">
            <a href="${verificationUrl}" class="button">
              Verify Email Address ✨
            </a>
          </div>
          
          <div class="info-box">
            <strong>⏰ Time Sensitive</strong>
            <p>This verification link will expire in 24 hours. If you don't verify within this time, you'll need to request a new verification email.</p>
          </div>
          
          <div class="info-box" style="background: #fef3c7; border-left-color: #f59e0b; margin-top: 24px;">
            <strong>🔒 Didn't sign up?</strong>
            <p>If you didn't create an account with AgriFarm, you can safely ignore this email. No further action is required.</p>
          </div>
        </div>
        
        <div class="footer">
          <p>© 2024 AgriFarm. All rights reserved.</p>
          <p>Building a sustainable future for agriculture</p>
          <div class="social-links">
            <a href="#">Twitter</a> • 
            <a href="#">Facebook</a> • 
            <a href="#">Instagram</a>
          </div>
          <p style="margin-top: 16px; font-size: 11px;">
            This email was sent to verify your AgriFarm account.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const getVerificationSuccessTemplate = (name) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Email Verified Successfully</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9fafb;
        }
        .header {
          background-color: #22c55e;
          padding: 20px;
          text-align: center;
          border-radius: 8px 8px 0 0;
        }
        .content {
          background-color: white;
          padding: 30px;
          border-radius: 0 0 8px 8px;
        }
        .success-icon {
          font-size: 48px;
          text-align: center;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Email Verified!</h1>
        </div>
        <div class="content">
          <div class="success-icon">✅</div>
          <h2>Welcome to AgriFarm, ${name}!</h2>
          <p>Your email has been successfully verified. You can now:</p>
          <ul>
            <li>Log in to your account</li>
            <li>Access all platform features</li>
            <li>Start connecting with farmers/buyers</li>
          </ul>
          <p>Get started by logging into your account!</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export const getWelcomeEmailTemplate = (name, role) => {
  const roleSpecificContent =
    role === "farmer"
      ? "start listing your products and reach more buyers"
      : "explore fresh farm products directly from farmers";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Welcome to AgriFarm</title>
    </head>
    <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to AgriFarm, ${name}! 🎉</h1>
        <p>We're excited to have you as a ${role} on our platform.</p>
        <p>You can now ${roleSpecificContent}.</p>
        <p>Here are some things you can do:</p>
        <ul>
          <li>Complete your profile</li>
          <li>Explore the platform</li>
          <li>Connect with other users</li>
        </ul>
        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Happy farming! 🌾</p>
        <p>- The AgriFarm Team</p>
      </div>
    </body>
    </html>
  `;
};
