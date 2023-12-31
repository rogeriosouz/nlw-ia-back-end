import { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";
import { fastifyMultipart } from '@fastify/multipart'
import path from "node:path";
import { randomUUID } from 'node:crypto'
import fs from 'node:fs'
import { promisify } from 'node:util'
import { pipeline } from "node:stream"
const pump = promisify(pipeline)

export async function uploadVideoRouter(app: FastifyInstance) {
  app.register(fastifyMultipart, {
    limits: {
      fieldSize: 1_048_576 * 25 // 25mb
    }
  })

  app.post('/videos', async (request, replay) => {
    const data = await request.file()

    if(!data) {
      return replay.status(404).send({ error: 'Video not found' })
    }

    const extension = path.extname(data.filename)

    if(extension !== '.mp3') {
      return replay.status(404).send({ error: 'Invalid input type, please upload a MP3.' })
    }

    const fileBaseName = path.basename(data.filename, extension)
    const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`

    const uploadDestination = path.resolve(__dirname, '../', '../', 'tmp', fileUploadName)

    await pump(data.file, fs.createWriteStream(uploadDestination))

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination,
      }
    })

    return { video }
  })
}