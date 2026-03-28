import sql from "../configs/connectDB";

export const authorizeRoles = (...allowedRoles) => {
  return async (req, res, next) => {
    try {
      // get user role from db
      const result = await sql`
        SELECT r.name as role
        FROM users u
        JOIN roles r ON u.role_id = r.id
        WHERE u.id = ${req.user.id}
      `;

      if (result.length === 0) {
        return res.status(403).json({
          success: false,
          message: "User role not found",
        });
      }

      req.user.role = result[0].role;

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
};
