import { FastifyReply, FastifyRequest } from "fastify";
import { signInSchema, signUpSchema } from "../schemas/auth.schema";
import { prisma } from "../plugins/prisma";
import bcrypt from "bcrypt";

export async function signIn(req: FastifyRequest, rep: FastifyReply) {
  const parsed = signInSchema.safeParse(req.body);
  if (!parsed.success)
    return rep.status(400).send({ error: parsed.error.format() });

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return rep.status(401).send({ error: "Invalid email or password" });

  const token = await rep.jwtSign({ sub: user.id, role: user.role });
  return rep.send({ token });
}

export async function signUp(req: FastifyRequest, rep: FastifyReply) {
  const parsed = signUpSchema.safeParse(req.body);
  if (!parsed.success)
    return rep.status(400).send({ error: parsed.error.format() });

  const { name, email, password, role, address, rg, cpf } = parsed.data;

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return rep.status(409).send({ error: "Email already in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        address: address,
        rg: rg,
        cpf: cpf,
        role: role,
      },
    });
    return rep.status(201).send({ message: "User created successfully" });
  } catch (error: any) {
    if (error.code === "P2002") {
      return rep.status(409).send({ error: "Email already in use" });
    }
    throw error;
  }
}
