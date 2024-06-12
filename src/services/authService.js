import User from "../models/user.js";
import { comparePassword, hashPassword } from "../utils/hashPassword.js";
import crypto from "crypto";
import transporter from "../utils/mailetrap.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { Sequelize } from "sequelize";
import jwt from "jsonwebtoken";

export const registerService = async (req) => {
  const { name, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const confirmationCode = crypto.randomBytes(20).toString("hex");

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    confirmationCode,
    confirmed: false,
  });

  const mailOptions = {
    from: '"Tavia Backend Test" <no-reply@demomailtrap.com>',
    to: user.email,
    subject: "Email Confirmation",
    html: `<h1>Email Confirmation</h1>
             <p>Please confirm your email by clicking the link below:</p>
             <a href="http://localhost:3000/api/auth/confirm/${confirmationCode}">Confirm Email</a>`,
  };

  await transporter.sendMail(mailOptions);

  return user;
};

export const confirmEmailService = async (confirmationCode) => {
  const user = await User.findOne({ where: { confirmationCode } });

  if (!user) {
    throw new Error("User not found");
  }

  user.confirmed = true;
  user.confirmationCode = null;
  await user.save();

  return user;
};

export const loginService = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  if (!user.confirmed) {
    throw new Error("Please confirm your email to login");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, token, refreshToken };
};

export const forgotPasswordService = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpires = Date.now() + 3600000; // 1 jam dari sekarang

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpires;
  await user.save();

  const mailOptions = {
    from: '"Tavia Backend Test" <no-reply@demomailtrap.com>',
    to: user.email,
    subject: "Password Reset",
    html: `<h1>Password Reset</h1>
             <p>Please reset your password by clicking the link below:</p>
             <a href="http://localhost:3000/api/auth/reset-password/${resetToken}">Reset Password</a>`,
  };

  await transporter.sendMail(mailOptions);

  return user;
};

export const resetPasswordService = async (req) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  const user = await User.findOne({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: {
        [Sequelize.Op.gt]: Date.now(),
      },
    },
  });

  if (!user) {
    throw new Error("Password reset token is invalid or has expired.");
  }

  const hashedPassword = await hashPassword(newPassword);

  user.password = hashedPassword;
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  return user;
};

export const refreshAuthTokenService = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error("Refresh token is required");
  }

  let userId;
  try {
    const decoded = await jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );
    userId = decoded.id;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }

  const user = await User.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found or invalid refresh token");
  }

  const newAccessToken = generateAccessToken(user.id);
  //   const newRefreshToken = generateRefreshToken(user.id);

  return { user, token: newAccessToken };
};
