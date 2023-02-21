import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user: { id: string; name: string }; // replace with your user type
}
