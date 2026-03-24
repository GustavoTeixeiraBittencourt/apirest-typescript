import { FastifyInstance } from "fastify";
import {
  getUsers,
  getUserById,
  updateUser,
  adminUpdateUser,
  adminCreateUser,
} from "../controllers/user.controller";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", app.authenticate);

  app.get("/", getUsers);
  app.get("/:id", getUserById);
  app.put("/me", updateUser);
  app.put("/:id", adminUpdateUser);
  app.post("/", adminCreateUser);
}
