const fs = require("fs");
const path = require("path");

// Basic frontmatter extractor
function extractFrontmatter(content) {
  const match = /^---\n([\s\S]+?)\n---/.exec(content);
  if (!match) return {};
  const lines = match[1].split("\n");
  const data = {};
  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    data[key.trim()] = rest.join(":").trim();
  }
  return data;
}

const assetFolder = path.join(__dirname, "../assets");
const outputFile = path.join(__dirname, "../public/assets.json");

const files = fs.readdirSync(assetFolder).filter(f => f.endsWith(".md"));

const result = [];

files.forEach(filename => {
  const raw = fs.readFileSync(path.join(assetFolder, filename), "utf8");
  const data = extractFrontmatter(raw);
  result.push({
    title: data.title || "",
    category: data.category || "",
    file: data.file || "",
    description: data.description || "",
    slug: filename.replace(".md", "")
  });
});

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
console.log("✅ Successfully wrote to assets.json:", result.length, "entries");
