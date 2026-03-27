import bcrypt from "bcrypt";
import sql from "../config/connectDB.js";
import logger from "../utils/logger.js";
import { generateToken } from "../utils/token.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Check if user exists
    const existingUser = await sql`
      SELECT id FROM users WHERE email = ${email}
    `;

    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    //Get role_id
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

    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insert user
    const newUser = await sql`
      INSERT INTO users (name, email, password_hash, role_id, verified)
      VALUES (${name}, ${email}, ${hashedPassword}, ${roleId}, false)
      RETURNING id, name, email, role_id, verified
    `;

    const user = newUser[0];

    //Generate JWT token
    const token = generateToken(user.id);

    //Set cookie (httpOnly for security)
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // 8. Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    logger.error("Error registering user:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginUser = async (req, res) => {};

export const logoutUser = async (req, res) => {};

export const refreshToken = async (req, res) => {};

export const getUserProfile = async (req, res) => {};

export const updateUserProfile = async (req, res) => {};

export const changePassword = async (req, res) => {};

export const forgotPassword = async (req, res) => {};

export const resetPassword = async (req, res) => {};

export const verifyEmail = async (req, res) => {};

export const resendVerificationEmail = async (req, res) => {};

export const deleteUser = async (req, res) => {};

export const getAllUsers = async (req, res) => {};

export const getUserById = async (req, res) => {};

export const updateUserById = async (req, res) => {};

export const deleteUserById = async (req, res) => {};
