import express, { Request, Response, NextFunction } from "express";

import { AppError } from "./errors/AppError";
import { usersRoutes } from "./routes/users.routes";

const app = express();

app.use(express.json());

app.use("/users", usersRoutes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        messsage: err.message,
        error: err.statusCode,
      });
    }

    return response.status(500).json({
      status: "error",
      error: 500,
      message: "Internal server error",
    });
  }
);

export { app };
