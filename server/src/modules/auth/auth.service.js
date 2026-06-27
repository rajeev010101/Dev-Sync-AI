import crypto from "crypto";

import User from "../../models/User.js";
import RefreshToken from "../../models/RefreshToken.js";
import PasswordResetToken from "../../models/PasswordResetToken.js";

import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from "../../utils/jwt.js";

import { sendEmail } from "../../services/email.service.js";

import BadRequestError from "../../utils/errors/BadRequestError.js";
import UnauthorizedError from "../../utils/errors/UnauthorizedError.js";

class AuthService {
  async register(payload) {
    const existingUser =
      await User.findOne({
        email: payload.email
      });

    if (existingUser) {
      throw new BadRequestError(
        "User already exists"
      );
    }

    const user =
      await User.create(payload);

    const accessToken =
      generateAccessToken({
        userId: user._id,
        role: user.role
      });

    const refreshToken =
      generateRefreshToken({
        userId: user._id
      });

    await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      expiresAt:
        new Date(
          Date.now() +
            7 * 24 * 60 * 60 * 1000
        )
    });

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async login(email, password) {
    const user =
      await User.findOne({
        email
      }).select("+password");

    if (!user) {
      throw new UnauthorizedError(
        "Invalid credentials"
      );
    }

    const isValid =
      await user.comparePassword(
        password
      );

    if (!isValid) {
      throw new UnauthorizedError(
        "Invalid credentials"
      );
    }

    const accessToken =
      generateAccessToken({
        userId: user._id,
        role: user.role
      });

    const refreshToken =
      generateRefreshToken({
        userId: user._id
      });

    await RefreshToken.create({
      user: user._id,
      token: refreshToken,
      expiresAt:
        new Date(
          Date.now() +
            7 * 24 * 60 * 60 * 1000
        )
    });

    return {
      user,
      accessToken,
      refreshToken
    };
  }

  async refresh(refreshToken) {
    const decoded =
      verifyRefreshToken(
        refreshToken
      );

    const tokenDoc =
      await RefreshToken.findOne({
        token: refreshToken,
        revoked: false
      });

    if (!tokenDoc) {
      throw new UnauthorizedError(
        "Refresh token revoked"
      );
    }

    tokenDoc.revoked = true;

    await tokenDoc.save();

    const accessToken =
      generateAccessToken({
        userId: decoded.userId
      });

    const newRefreshToken =
      generateRefreshToken({
        userId: decoded.userId
      });

    await RefreshToken.create({
      user: decoded.userId,
      token: newRefreshToken,
      expiresAt:
        new Date(
          Date.now() +
            7 * 24 * 60 * 60 * 1000
        )
    });

    return {
      accessToken,
      refreshToken:
        newRefreshToken
    };
  }

  async forgotPassword(email) {
    const user =
      await User.findOne({ email });

    if (!user) {
      return;
    }

    const token =
      crypto
        .randomBytes(32)
        .toString("hex");

    await PasswordResetToken.create({
      user: user._id,
      token,
      expiresAt:
        new Date(
          Date.now() +
            60 * 60 * 1000
        )
    });

    const resetUrl =
      `${process.env.CLIENT_URL}/reset-password/${token}`;

    await sendEmail({
      to: user.email,
      subject:
        "Reset Password",
      html: `
      <h2>Password Reset</h2>
      <a href="${resetUrl}">
      Reset Password
      </a>
      `
    });
  }

  async resetPassword(
    token,
    password
  ) {
    const resetToken =
      await PasswordResetToken.findOne({
        token
      });

    if (!resetToken) {
      throw new BadRequestError(
        "Invalid token"
      );
    }

    if (
      resetToken.expiresAt <
      new Date()
    ) {
      throw new BadRequestError(
        "Expired token"
      );
    }

    const user =
      await User.findById(
        resetToken.user
      ).select("+password");

    user.password = password;

    await user.save();

    await PasswordResetToken.deleteOne({
      _id: resetToken._id
    });

    return true;
  }
}

export default new AuthService();