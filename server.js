import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgres.js'
const port = process.env.PORT || 4000;

const server = fastify()

// const database = new DatabaseMemory()
const database = new DatabasePostgres()

// GET, POST, UPDATE, DELETE, PATCH...

server.post('/videos', (request, reply) => {
    const { title, description, duration, url} = request.body

    database.create({
        title,
        description,
        duration,
        url
    })

    return reply.status(200).send()
})

server.get('/videos', async (request) => {
    
    const search = request.query.search

    console.log(search)

    const videos = await database.list(search)

    return videos
    })

server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    const { title, description, duration, url} = request.body

    await database.update(videoId, {
        title,
        description,
        duration,
        url
    })

    return reply.status(204)    
})
    

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id
        
    database.delete(videoId)
        
    return reply.status(204).send()    
})

server.get('/', () => {
    return 'Hello world'
})

server.listen({ 
    port,
  host: '0.0.0.0'
}, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`)
})

