const fs = require('fs');
const path = require('path');

function mimeTypeFor(ext) {
  ext = ext.toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.woff') return 'font/woff';
  if (ext === '.woff2') return 'font/woff2';
  if (ext === '.ttf') return 'font/ttf';
  if (ext === '.otf') return 'font/otf';
  if (ext === '.js') return 'application/javascript';
  if (ext === '.css') return 'text/css';
  return 'application/octet-stream';
}

function toDataURI(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath);
  const mime = mimeTypeFor(ext);
  const b64 = buffer.toString('base64');
  return `data:${mime};base64,${b64}`;
}

function inlineCssAssets(css, distDir) {
  // Replace url(...) occurrences
  return css.replace(/url\(([^)]+)\)/g, (m, g1) => {
    let url = g1.trim().replace(/^['"]|['"]$/g, '');
    // ignore data: and external
    if (/^data:/.test(url) || /^https?:\/\//.test(url)) return `url(${g1})`;
    // remove leading slash
    if (url.startsWith('/')) url = url.slice(1);
    const assetPath = path.join(distDir, url);
    if (!fs.existsSync(assetPath)) return `url(${g1})`;
    const datauri = toDataURI(assetPath);
    return `url('${datauri}')`;
  });
}

function inlineJsAssets(js, distDir) {
  // Replace occurrences of '/assets/...' inside quotes
  return js.replace(/(["'])\/assets\/([^"']+)\1/g, (m, q, p) => {
    const assetRel = `assets/${p}`; // remove leading slash
    const assetPath = path.join(distDir, assetRel);
    if (!fs.existsSync(assetPath)) return m;
    const datauri = toDataURI(assetPath);
    return `${q}${datauri}${q}`;
  });
}

function inlineHtmlAssets(html, distDir) {
  // Replace <img src="/assets/..."> and similar
  html = html.replace(/src=(['"]?)\/assets\/([^'"\s>]+)\1/g, (m, q, p) => {
    const assetPath = path.join(distDir, 'assets', p);
    if (!fs.existsSync(assetPath)) return m;
    const datauri = toDataURI(assetPath);
    return `src=${q}${datauri}${q}`;
  });
  // Replace href for link rel icons if local
  html = html.replace(/href=(['"])\/assets\/([^"']+)\1/g, (m, q, p) => {
    const assetPath = path.join(distDir, 'assets', p);
    if (!fs.existsSync(assetPath)) return m;
    const datauri = toDataURI(assetPath);
    return `href=${q}${datauri}${q}`;
  });
  return html;
}

async function buildSingleFile() {
  const repoRoot = path.resolve(__dirname, '..');
  const distDir = path.join(repoRoot, 'client', 'dist');
  const outPath = path.join(repoRoot, 'site-singlepage.html');

  if (!fs.existsSync(distDir)) {
    console.error('dist directory not found. Run client build first.');
    process.exit(1);
  }

  let indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  // Inline stylesheets
  indexHtml = indexHtml.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/g, (match) => {
    const hrefMatch = match.match(/href=["']([^"']+)["']/);
    if (!hrefMatch) return match;
    let href = hrefMatch[1];
    if (/^https?:\/\//.test(href)) return match; // keep external
    if (href.startsWith('/')) href = href.slice(1);
    const cssPath = path.join(distDir, href);
    if (!fs.existsSync(cssPath)) return match;
    let css = fs.readFileSync(cssPath, 'utf8');
    css = inlineCssAssets(css, distDir);
    return `<style>\n${css}\n</style>`;
  });

  // Inline module scripts
  indexHtml = indexHtml.replace(/<script[^>]*type=["']module["'][^>]*src=["']([^"']+)["'][^>]*><\/script>/g, (match, src) => {
    if (/^https?:\/\//.test(src)) return match;
    if (src.startsWith('/')) src = src.slice(1);
    const jsPath = path.join(distDir, src);
    if (!fs.existsSync(jsPath)) return match;
    let js = fs.readFileSync(jsPath, 'utf8');
    js = inlineJsAssets(js, distDir);
    return `<script type="module">\n${js}\n</script>`;
  });

  // Inline any img/href assets in html
  indexHtml = inlineHtmlAssets(indexHtml, distDir);

  fs.writeFileSync(outPath, indexHtml, 'utf8');
  console.log('Wrote single-file HTML to', outPath);
}

buildSingleFile().catch(err => { console.error(err); process.exit(1); });
