import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(_req, res) {
    try {
        const filePath = path.resolve('db.json');
        const fileData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(fileData);

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.status(200).json(data);
    } catch (error) {
        console.error("Error reading db.json:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}