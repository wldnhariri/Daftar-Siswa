import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const filePath = path.join(process.cwd(), 'db.json');
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    res.setHeader('Access-Control-Allow-Origin', '*'); // Memungkinkan akses dari domain manapun
    res.status(200).json(data);
}