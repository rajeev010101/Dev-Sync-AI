import AuthService from "./auth.service.js";

import {
  successResponse
} from "../../utils/ApiResponse.js";

import {
  refreshCookieOptions
} from "../../utils/cookies.js";

class AuthController {
  register = async (
    req,
    res,
    next
  ) => {
    try {
      const result =
        await AuthService.register(
          req.body
        );

      res.cookie(
        "refreshToken",
        result.refreshToken,
        refreshCookieOptions
      );

      return successResponse(
        res,
        result,
        "User Registered",
        201
      );
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req,
    res,
    next
  ) => {
    try {
      const result =
        await AuthService.login(
          req.body.email,
          req.body.password
        );

      res.cookie(
        "refreshToken",
        result.refreshToken,
        refreshCookieOptions
      );

      return successResponse(
        res,
        result,
        "Login Successful"
      );
    } catch (error) {
      next(error);
    }
  };

  refresh = async (
    req,
    res,
    next
  ) => {
    try {
      const token =
        req.cookies.refreshToken;

      const result =
        await AuthService.refresh(
          token
        );

      res.cookie(
        "refreshToken",
        result.refreshToken,
        refreshCookieOptions
      );

      return successResponse(
        res,
        result
      );
    } catch (error) {
      next(error);
    }
  };

  forgotPassword =
    async (
      req,
      res,
      next
    ) => {
      try {
        await AuthService.forgotPassword(
          req.body.email
        );

        return successResponse(
          res,
          {},
          "Email Sent"
        );
      } catch (error) {
        next(error);
      }
    };

  resetPassword =
    async (
      req,
      res,
      next
    ) => {
      try {
        await AuthService.resetPassword(
          req.body.token,
          req.body.password
        );

        return successResponse(
          res,
          {},
          "Password Updated"
        );
      } catch (error) {
        next(error);
      }
    };

  logout = async (
    req,
    res
  ) => {
    res.clearCookie(
      "refreshToken"
    );

    return successResponse(
      res,
      {},
      "Logged Out"
    );
  };
}

export default new AuthController();