import { FastifyRequest, FastifyReply } from "fastify";
import { prisma } from "../plugins/prisma";
import bcrypt from "bcrypt";

export async function getUsers(req: any, rep: FastifyReply) {
  if (req.user.role !== "ADMIN")
    return rep.status(403).send({ error: "Access denied" });

  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      role: true,
      rg: true,
      cpf: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });
  return rep.send({ users });
}

export async function getUserById(req: any, rep: FastifyReply) {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      role: true,
      rg: true,
      cpf: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });
  if (!user) return rep.status(404).send({ error: "User not found" });
  return rep.send({ user });
}

export async function updateUser(req: any, rep: FastifyReply) {
  const { address } = req.body;

  const userId = req.user.sub;
  const user = await prisma.user.update({
    where: { id: userId },
    data: { address },
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      role: true,
      rg: true,
      cpf: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return rep.send({ user });
}

export async function adminUpdateUser(req: any, rep: FastifyReply) {
  const { id } = req.params;
  const { name, email, password, address, role, rg, cpf } = req.body;

  const data: any = { name, email, address, role, rg, cpf };
  if (password) {
    data.password = await bcrypt.hash(password, 10);
  }

  const user = await prisma.user.update({
    where: { id: id },
    data: data,
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      role: true,
      rg: true,
      cpf: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return rep.send({ user });
}

export async function adminCreateUser(req: any, rep: FastifyReply) {
  if (req.user.role !== "ADMIN")
    return rep.status(403).send({ error: "Access denied" });

  const { name, email, password, address, role, rg, cpf } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      address,
      role,
      rg,
      cpf,
    },
    select: {
      id: true,
      email: true,
      name: true,
      address: true,
      role: true,
      rg: true,
      cpf: true,
      createdAt: true,
      updatedAt: true,
      password: false,
    },
  });

  return rep.status(201).send({ user });
}
