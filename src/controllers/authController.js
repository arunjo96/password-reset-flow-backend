
import sendEmail from "../utills/sendEmail.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                status: "failed",
                message: "User already exists"
            });
        }
      
        const user = await User.create({
            name,
            email,
            password
        });
        return res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: "failed",
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign({ email: user.email },
            process.env.JWT_AUTH_SECRET_KEY,
            { expiresIn: '15m' });
        return res.status(200).json({
            status: "success",
            message: "Logged in successfully",
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found"
            });
        }
        const resetString = Math.random().toString(36).substring(2, 15);
        user.resetPasswordString = resetString;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; 
        await user.save();

        const resetLink = `${process.env.CLIENT_URL}resetPassword/${resetString}`;


         sendEmail(user.email,
            "Password Reset", `
            <p>Click the link below to reset your password (valid for 15 minutes):</p>
            <a href="${resetLink}">${resetLink}</a> `);

        return res.status(200).json({
            status: "success",
            message: "Password reset link sent to your email"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "failed",
            message: "Internal server error"
        });
    }
}

export const resetPassword = async (req, res) => {
  const { token } = req.params;        // ✅ path param
  const { newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({
      status: "failed",
      message: "Token and new password are required"
    });
  }

  try {
    const user = await User.findOne({ resetPasswordString: token });
    if (!user || !user.resetPasswordExpires || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid or expired reset token"
      });
    }

    const saltRounds = Number(process.env.ENCRYPT_SALT_ROUNDS || 10);
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    user.password = hashedPassword;
    user.resetPasswordString = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password reset successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error"
    });
  }
};




