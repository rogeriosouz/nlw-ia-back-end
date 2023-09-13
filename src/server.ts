import { fastify } from 'fastify'
import 'dotenv/config'
const app = fastify()

app.get('/', () => {
  return 'hello world'
})

app.listen({
  port: Number(process.env.PORT)
}).then(() => {
  console.log('server is running 🚀 -> http://localhost:3333')
})