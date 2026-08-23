import express from 'express';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import path from 'path';

import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

try {
  const brainDir = '/home/lezscripts/.gemini/antigravity/brain/b873d450-24ff-4037-9180-637561b12405';
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const assets = [
    { src: path.join(brainDir, 'media__1787465950415.png'), dest: path.join(publicDir, 'profile.png') },
    { src: path.join(brainDir, 'media__1787470371683.png'), dest: path.join(publicDir, 'logo.png') },
    { src: path.join(brainDir, 'album_until_i_found_you_1787464346557.png'), dest: path.join(publicDir, 'until_i_found_you.png') }
  ];

  assets.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  });
} catch (e) {
  console.error('Asset sync note:', e.message);
}

app.use(express.json());

const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'portfolio-api' }));

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      await Message.create({ name, email, message });
    }
    res.status(201).json({ message: 'Thanks, I will be in touch soon.' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to send your message right now.' });
  }
});

app.use(express.static(path.join(__dirname, '../dist')));
app.get(/.*/, (_req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

app.listen(PORT, () => console.log(`Portfolio API running on http://localhost:${PORT}`));
