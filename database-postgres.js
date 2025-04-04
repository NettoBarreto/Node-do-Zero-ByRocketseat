import { randomUUID } from 'node:crypto'
import {sql} from './db.js'

// Set, Map

export class DatabasePostgres {
    #videos = new Map()

async list(search) {
    let videos

    if (search) {
        videos = await sql`SELECT * FROM videos WHERE title ILIKE ${'%' + search + '%'}`
    } else {
        videos = await sql`SELECT * FROM videos`
    }
    return videos
}

async create(video) {
    const videoId = randomUUID()

    const { title, description, duration, url } = video

    await sql `insert into videos (id, title, description, duration, url) values (${videoId}, ${title}, ${description}, ${duration}, ${url})`
    }

async update(id, video) {

    const { title, description, duration, url } = video

    await sql `update videos set title = ${title}, description = ${description}, duration = ${duration}, url = ${url} where id = ${id}`
        
    }

async delete(id, video) {
    
    await sql `delete from videos where id = ${id}`

    }
}