import { apiError, success } from "@utils/response";
import { Request, Response } from "express";
import userService from "../service/user_services";
import AuthServices from "../service/auth_services";
import { hashPassword } from "@utils/bcrypt";

class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { password, ...data } = req.body;
      const hashedPassword = await hashPassword(password);
      const userData = {
        password: hashedPassword,
        ...data,
      };
      const newUser = await userService.createUser(userData);
      res.status(201).json(success("Created", 201, newUser));
    } catch (error: any) {
      res.status(500).json(apiError("Failed to Create", error.message, 500));
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const result = await AuthServices.authenticateUser(email, password);
      if (!result) {
        res.status(401).json(apiError("Invalid credentials", {}, 401));
        return;
      }
      const tokens = await AuthServices.generateAuthToken(result);
      res
        .status(200)
        .json(success("Login Successful", 200, { result, ...tokens }));
    } catch (error: any) {
      res.status(500).json(apiError("Failed to Login", error.message, 500));
    }
  }
}

export default new UserController();
