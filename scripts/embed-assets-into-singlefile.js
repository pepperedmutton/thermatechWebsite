const fs = require('fs');
const path = require('path');

function mimeTypeFromExt(ext) {
  ext = ext.toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.woff') return 'font/woff';
  if (ext === '.woff2') return 'font/woff2';
  if (ext === '.ttf') return 'font/ttf';
  if (ext === '.otf') return 'font/otf';
  if (ext === '.eot') return 'application/vnd.ms-fontobject';
  if (ext === '.css') return 'text/css';
  if (ext === '.js') return 'application/javascript';
  if (ext === '.json') return 'application/json';
  return 'application/octet-stream';
}

function toDataURI(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = mimeTypeFromExt(ext);
  const buffer = fs.readFileSync(filePath);
  if (ext === '.svg') {
    try {
      const text = buffer.toString('utf8');
      if (/\uFFFD/.test(text)) throw new Error('invalid utf8');
      const encoded = encodeURIComponent(text)
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29');
      return `data:${mime};charset=utf-8,${encoded}`;
    } catch (error) {
      return `data:${mime};base64,${buffer.toString('base64')}`;
    }
  }
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

function main() {
  const repoRoot = path.resolve(__dirname, '..');
  const distDir = path.join(repoRoot, 'client', 'dist');
  const singleFile = path.join(distDir, 'langmuir-singlepage.html');

  if (!fs.existsSync(singleFile)) {
    console.error('Expected generated single file at', singleFile);
    console.error('Please run `node scripts/make-singlefile.js` (or build) first.');
    process.exit(2);
  }

  let html = fs.readFileSync(singleFile, 'utf8');
  const assetsDir = path.join(distDir, 'assets');

  if (!fs.existsSync(assetsDir)) {
    console.warn('No assets directory found, skipping asset embedding.');
  } else {
    const walk = (dir) => {
      const collected = [];
      for (const name of fs.readdirSync(dir)) {
        const filePath = path.join(dir, name);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
          collected.push(...walk(filePath));
        } else {
          collected.push(filePath);
        }
      }
      return collected;
    };

    const files = walk(assetsDir);
    files.sort((a, b) => b.length - a.length);

    for (const filePath of files) {
      const relPathFromDist = path.relative(distDir, filePath).replace(/\\/g, '/');
      const relPathFromRoot = path.posix.join('client', 'dist', relPathFromDist);
      const alt1 = '/' + relPathFromDist;
      const alt2 = relPathFromDist;
      const alt3 = relPathFromRoot;

      const dataUri = toDataURI(filePath);
      const patterns = [alt1, alt2, alt3].map((value) =>
        value.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
      );
      const regex = new RegExp(patterns.join('|'), 'g');

      if (regex.test(html)) {
        html = html.replace(regex, dataUri);
        console.log('Inlined', relPathFromDist);
      }
    }
  }

  const outPath = path.join(repoRoot, 'site-singlepage.html');
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Wrote final single-file site to', outPath);
}

main();
