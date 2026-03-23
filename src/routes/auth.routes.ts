import { FastifyInstance } from "fastify";


export async function authRoutes(app: FastifyInstance) {
    app.post('/sign-in', singIn),
    app.post('/sign-out', signUp)
}