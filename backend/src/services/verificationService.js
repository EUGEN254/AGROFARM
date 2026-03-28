// services/verificationService.js
import sql from "../configs/connectDB.js";
import crypto from "crypto";
import { getVerificationEmailTemplate } from "../utils/emailTemplates.js";
import logger from "../utils/logger.js";
import axios from "axios";

export const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const createVerificationToken = async (userId) => {
  const token = generateVerificationToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours expiry

  await sql`
    UPDATE users 
    SET verification_token = ${token}, 
        verification_token_expires = ${expiresAt}
    WHERE id = ${userId}
  `;

  return token;
};

export const sendVerificationEmail = async (user) => {
  const token = await createVerificationToken(user.id);

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: process.env.SENDER_NAME,
          email: process.env.SENDER_EMAIL,
        },
        to: [{ email: user.email, name: user.name }],
        subject: "Verify Your Email Address",
        htmlContent: getVerificationEmailTemplate(user.name, verificationUrl),
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    return { success: true, messageId: response.data.messageId };
  } catch (error) {
    logger.error(
      "Error sending email:",
      error.response ? error.response.data : error.message,
    );
    throw new Error("Failed to send verification email");
  }
};

// services/verificationService.js

export const verifyEmailToken = async (token) => {
  try {
    // Find user with the verification token - DON'T try to select 'role' column directly
    const result = await sql`
      SELECT u.id, u.name, u.email, u.verified, u.verification_token, r.name as role
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.verification_token = ${token}
    `;

    if (result.length === 0) {
      throw new Error("Invalid or expired verification token");
    }

    const user = result[0];

    // Check if already verified
    if (user.verified) {
      throw new Error("Email already verified");
    }

    // Update user as verified
    await sql`
      UPDATE users 
      SET verified = true, verification_token = NULL 
      WHERE id = ${user.id}
    `;

    // Return user with role
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      verified: true,
      role: user.role, 
    };
  } catch (error) {
    logger.error("Error in verifyEmailToken:", error);
    throw error;
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    // Get user by email - use 'verified'
    const userResult = await sql`
      SELECT u.id, u.name, u.email, u.verified, r.name as role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = ${email}
    `;

    if (userResult.length === 0) {
      throw new Error("User not found");
    }

    const user = userResult[0];

    // Check if already verified
    if (user.verified) {
      throw new Error("Email already verified");
    }

    // Generate new verification token
    const crypto = await import("crypto");
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Update user with new token
    await sql`
      UPDATE users 
      SET verification_token = ${verificationToken}
      WHERE id = ${user.id}
    `;

    // Send verification email
    const userWithRole = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      verified: user.verified,
    };

    await sendVerificationEmail(userWithRole, verificationToken);

    return { success: true };
  } catch (error) {
    console.error("Error in resendVerificationEmail:", error);
    throw error;
  }
};
