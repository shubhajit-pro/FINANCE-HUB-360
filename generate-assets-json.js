const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const assetsDir = path.join(__dirname, 'assets');
const outputFile = path.join(__dirname, 'assets.json');

const assets = [];

fs.readdirSync(assetsDir).forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(assetsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const data = matter(content).data;

    if (data.title && data.category && data.file) {
      assets.push({
        title: data.title,
        category: data.category,
        file: data.file
      });
    }
  }
});

fs.writeFileSync(outputFile, JSON.stringify({ assets }, null, 2));
console.log('✅ assets.json generated!');
