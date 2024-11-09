import { error } from 'console';
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'db.json')

    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err) {
            console.error(err)
            res.status(500).json({ error: 'Failed to load data' })
            return
        }

        res.status(200).json(JSON.parse(data))
    })
}