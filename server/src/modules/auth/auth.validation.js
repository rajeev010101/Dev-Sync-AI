import { body } from "express-validator";

export const registerValidation = [
  body("firstName").notEmpty(),
  body("lastName").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({
    min: 8
  })
];

export const loginValidation = [
  body("email").isEmail(),
  body("password").notEmpty()
];

export const forgotPasswordValidation = [
  body("email").isEmail()
];

export const resetPasswordValidation = [
  body("token").notEmpty(),
  body("password").isLength({
    min: 8
  })
];