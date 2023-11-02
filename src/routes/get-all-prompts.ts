import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function getAllPromptsRouter(app: FastifyInstance) {
  app.get('/prompts', async () => {
    const prompts = await prisma.promt.findMany({
      select: {
        id: true,
        title: true,
        tamplate: true,
        createAt: true
      }
    })
  
    return prompts
  })
  
}