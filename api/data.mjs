import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    try {
        const filePath = path.join(process.cwd(), 'db.json');
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileData);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (error) {
        console.error("Error reading db.json:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}