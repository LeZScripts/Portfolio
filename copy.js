import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const brainDir = '/home/lezscripts/.gemini/antigravity/brain/b873d450-24ff-4037-9180-637561b12405';
const tempMediaDir = path.join(brainDir, '.tempmediaStorage');
const destDir = path.join(__dirname, 'public', 'travel');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

let allMediaFiles = [];

if (fs.existsSync(brainDir)) {
  fs.readdirSync(brainDir).forEach(f => {
    if (f.startsWith('media_') || f.startsWith('media__')) {
      const full = path.join(brainDir, f);
      try {
        const stat = fs.statSync(full);
        if (stat.isFile()) allMediaFiles.push({ path: full, time: stat.mtimeMs, name: f });
      } catch (err) {}
    }
  });
}

if (fs.existsSync(tempMediaDir)) {
  fs.readdirSync(tempMediaDir).forEach(f => {
    const full = path.join(tempMediaDir, f);
    try {
      const stat = fs.statSync(full);
      if (stat.isFile()) allMediaFiles.push({ path: full, time: stat.mtimeMs, name: f });
    } catch (err) {}
  });
}

allMediaFiles.sort((a, b) => b.time - a.time);

console.log('Top 10 files:', allMediaFiles.slice(0, 10).map(m => m.name));

const latestPhotos = allMediaFiles.slice(0, 25);
latestPhotos.forEach((item, index) => {
  const ext = path.extname(item.name) || '.png';
  const destName = `travel_${index + 1}${ext}`;
  fs.copyFileSync(item.path, path.join(destDir, destName));
  console.log(`Copied ${item.name} -> public/travel/${destName}`);
});
