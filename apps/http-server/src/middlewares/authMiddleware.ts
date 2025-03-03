import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"];
  if (token) {
    const decodeToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    );
    if (decodeToken) {
      if (typeof decodeToken === "string") {
        res.status(400).send({ message: "Token is malformed" });
        return;
      }
      req.userId = decodeToken.id;
      next();
    }
  } else {
    res.status(400).send({ message: "No token provided" });
  }
};

export default authMiddleware;
