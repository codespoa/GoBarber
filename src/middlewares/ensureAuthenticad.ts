import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import configAuth from "../config/auth";

interface TokenPayload {
    iat: number
    exp: number
    sub: string
}

export default function ensureAuthenticad(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token JWT foi perdido");
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, configAuth.jwt.secret);

    const { sub } = decoded as TokenPayload;
    request.user = {
        id: sub
    }

    return next();

  } catch {
    throw new Error("Token JWT inválido");
  }
}
