import "dotenv/config";
import Fastify from "fastify";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { authRoutes } from "./routes/auth.routes";
import { userRoutes } from "./routes/user.routes";

const app = Fastify({ logger: true });

app.register(jwt, {
  secret: process.env.JWT_SECRET!,
});

app.decorate("authenticate", async (request: any, reply: any) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
});

app.register(swagger, {
  swagger: {
    info: {
      title: "Minha API REST",
      description: "Documentação da API RESTful com Fastify",
      version: "1.0.0",
    },
    tags: [
      { name: "auth", description: "Autenticação" },
      { name: "users", description: "Operações com usuários" },
    ],
  },
});

app.register(swaggerUI, {
  routePrefix: "/docs",
});

app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/users" });

app.get("/", async () => {
  return { message: "API Fastify funcionando!" };
});

app.get("/health", async () => ({ status: "ok" }));

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server rodando em ${address}`);
});

export default app;
