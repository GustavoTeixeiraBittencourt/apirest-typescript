import fastify from "fastify";
import jwt from "@fastify/jwt";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";

const app = fastify();

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
      title: "API REST 2.0",
      description: "API REST Documentation with fastify, legible version",
      version: "2.0.0",
    },
    tags: [
      { name: "auth", description: "authentication" },
      { name: "users", description: "Users Operations" },
    ],
  },
});

app.register(swaggerUi, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
});
