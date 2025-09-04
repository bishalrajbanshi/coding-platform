import { check } from "express-validator";

export const userValidator = [
    check('name')
    .notEmpty()
    .withMessage('Name is required'),

    check('email')
    .notEmpty()
    .withMessage('Email is required')
    .bail()
    .isEmail()
    .withMessage('Invalid Email Format'),


    check('profileImage')
    .optional()
    .notEmpty()
    .withMessage('Prifile Image is required'),

    check('phone')
    .optional()
    .notEmpty


]