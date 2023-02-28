import { Request, Response, NextFunction } from "express";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  password: string;
  username: string;
  gender: string;
  service: string;
  email: string;
  phone: string;
  birth_date: Date;
  is_admin: boolean;
  is_blocked: boolean;
  avatar_image: string;
}

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = req.user as User | undefined;

  if (!user || !user.is_admin) {
    res.status(401).send({
      message: "Invalid Admin Token, this user is not an Administrator in this service",
    });
    return;
  }

  next();
};
