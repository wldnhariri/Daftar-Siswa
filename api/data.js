import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const data = require('../db.json');

export default function handler(req, res) {
    res.status(200).json(data);
}