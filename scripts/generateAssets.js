
const fs = require('fs');
const matter = require('gray-matter');

const assetDir = './assets/';
const outputFile = './public/assets.json';

const files = fs.readdirSync(assetDir).filter(file => file.endsWith('.md'));

const assets = files.map(filename => {
  const content = fs.readFileSync(`${assetDir}${filename}`, 'utf8');
  const { data } = matter(content);

  return {
    title: data.title || '',
    category: data.category || '',
    file: data.file || '',
    description: data.description || '',
    slug: filename.replace('.md', '')
  };
});

fs.writeFileSync(outputFile, JSON.stringify(assets, null, 2));
console.log('assets.json generated');
