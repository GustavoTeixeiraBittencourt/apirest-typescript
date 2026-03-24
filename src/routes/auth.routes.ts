import { FastifyInstance } from "fastify";
import { signIn, signUp } from "../controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/sign-in", signIn);
  app.post("/sign-up", signUp);
}
