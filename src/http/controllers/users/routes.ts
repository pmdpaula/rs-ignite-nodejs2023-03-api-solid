import { FastifyInstance } from "fastify";
import { register } from "../register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export const usersRoutes = async (app: FastifyInstance) => {
  app.post("/users", register);

  app.post("/sessions", authenticate);

  /** Authenticated Routes */

  app.get("/me", { onRequest: [verifyJwt] }, profile);
};
