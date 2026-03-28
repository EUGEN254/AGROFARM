// controllers/authController.js
import bcrypt from "bcrypt";
import logger from "../utils/logger.js";
import { generateToken } from "../utils/token.js";
import {
  normalizeLoginInput,
  normalizeRegisterInput,
} from "../utils/normalize.js";
import {
  validateLoginInput,
  validateRegisterInput,
} from "../validators/authValidator.js";
import sql from "../configs/connectDB.js";
import { sendVerificationEmail } from "../services/verificationService.js";
import {
  verifyEmailToken,
  resendVerificationEmail as resendVerificationService,
} from "../services/verificationService.js";
import { getVerificationSuccessTemplate } from "../utils/emailTemplates.js";

// ==================== REGISTER USER ====================
export const registerUser = async (req, res) => {
  try {
    const input = normalizeRegisterInput(req.body);

    // 🔹 Validation
    const error = validateRegisterInput(input);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const { name, email, password, role } = input;

    // 🔹 Check existing user
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 🔹 Get role_id
    const roleResult = await sql`
      SELECT id FROM roles WHERE name = ${role}
    `;

    if (roleResult.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const roleId = roleResult[0].id;

    // 🔹 Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // 🔹 Insert user
    const newUser = await sql`
      INSERT INTO users (name, email, password_hash, role_id, verified)
      VALUES (${name}, ${email}, ${hashedPassword}, ${roleId}, false)
      RETURNING id, name, email, role_id, verified
    `;

    const user = newUser[0];

    // 🔹 Get role name
    const roleData = await sql`
      SELECT name FROM roles WHERE id = ${user.role_id}
    `;

    const userWithRole = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: roleData[0].name,
      verified: user.verified,
      email_verified: user.email_verified,
    };

    // 🔹 Send verification email
    await sendVerificationEmail(userWithRole);

    // 🔹 Generate token
    const token = generateToken(user.id);

    // 🔹 Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please check your email to verify your account.",
      user: userWithRole,
      token,
      requiresVerification: true,
    });
  } catch (error) {
    logger.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== LOGIN USER ====================
export const loginUser = async (req, res) => {
  const input = normalizeLoginInput(req.body);

  const error = validateLoginInput(input);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }

  const { email, password } = input;

  try {
    const result = await sql`
      SELECT u.id, u.name, u.email, u.password_hash, u.verified, r.name as role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = ${email}
    `;

    // 🔹 User not found
    if (result.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const user = result[0];

    // 🔹 Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 🔹 Check if email is verified (use 'verified' not 'email_verified')
    if (!user.verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in",
        requiresVerification: true,
        email: user.email,
      });
    }

    // 🔹 Generate token
    const token = generateToken(user.id);

    // 🔹 Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 🔹 Remove sensitive data
    delete user.password_hash;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    logger.error("Error logging in user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== LOGOUT USER ====================
export const logoutUser = async (req, res) => {
  try {
    // 🔹 Clear cookie
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: new Date(0),
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    logger.error("Error logging out user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== GET USER PROFILE ====================
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await sql`
      SELECT u.id, u.name, u.email, u.verified, u.verified, r.name as role
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.id = ${userId}
    `;

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const user = result[0];

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    logger.error("Error fetching user profile:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// ==================== VERIFY EMAIL ====================
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required",
      });
    }

    const user = await verifyEmailToken(token);

    // Generate a new token for auto-login
    const authToken = generateToken(user.id);

    // Set cookie
    res.cookie("token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        verified: true,
      },
      token: authToken,
    });
  } catch (error) {
    logger.error("Email verification error:", error);
    return res.status(400).json({
      success: false,
      message: error.message || "Invalid or expired verification link",
    });
  }
};

// ==================== RESEND VERIFICATION EMAIL ====================
export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const result = await resendVerificationService(email);

    res.json({
      success: true,
      message: "Verification email sent successfully",
    });
  } catch (error) {
    logger.error("Resend verification error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const refreshToken = async (req, res) => {};

export const updateUserProfile = async (req, res) => {};

export const changePassword = async (req, res) => {};

export const forgotPassword = async (req, res) => {};

export const resetPassword = async (req, res) => {};

export const deleteUser = async (req, res) => {};

export const getAllUsers = async (req, res) => {};

export const getUserById = async (req, res) => {};

export const updateUserById = async (req, res) => {};

export const deleteUserById = async (req, res) => {};
