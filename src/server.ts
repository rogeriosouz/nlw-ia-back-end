import { fastify } from 'fastify'
import 'dotenv/config'
import { getAllPromptsRouter } from './routes/get-all-prompts'
import { uploadVideoRouter } from './routes/upload-video'
import { createTranscriptionRouter } from './routes/create-transcription'
import cors from '@fastify/cors'
import { generateIaCompletionRouter } from './routes/generate-ia-completion'
const app = fastify()

app.register(getAllPromptsRouter)
app.register(uploadVideoRouter)
app.register(createTranscriptionRouter)
app.register(generateIaCompletionRouter)

app.register(cors, { 
  origin: '*',
})

app.listen({
  port: Number(process.env.PORT) ?? 3333
}).then(() => {
  console.log('server is running 🚀 -> http://localhost:3333')
})