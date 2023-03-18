import { Request, Response, NextFunction } from "express";
import { UserAttributes } from "../constants/constants";

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as UserAttributes | undefined;

  if (!user || !user.is_admin) {
    res.status(401).send({
      message: "Invalid Admin Token, this user is not an Administrator in this service",
    });
    return;
  }

  next();
};
