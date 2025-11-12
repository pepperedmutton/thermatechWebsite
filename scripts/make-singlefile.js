const fs = require('fs');
const path = require('path');

async function inlineDist() {
  const repoRoot = path.resolve(__dirname, '..');
  const distDir = path.join(repoRoot, 'client', 'dist');
  const outPath = path.join(distDir, 'langmuir-singlepage.html');

  let indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

  // Inline stylesheet links
  indexHtml = indexHtml.replace(/<link[^>]*rel=["']stylesheet["'][^>]*>/g, (match) => {
    const hrefMatch = match.match(/href=["']([^"']+)["']/);
    if (!hrefMatch) return match;
    let href = hrefMatch[1];
    // ignore external urls (http/https)
    if (/^https?:\/\//.test(href)) return match;
    // strip leading slash
    if (href.startsWith('/')) href = href.slice(1);
    const cssPath = path.join(distDir, href);
    if (!fs.existsSync(cssPath)) return match;
    const css = fs.readFileSync(cssPath, 'utf8');
    return `<style>\n${css}\n</style>`;
  });

  // Inline module scripts
  indexHtml = indexHtml.replace(/<script[^>]*type=["']module["'][^>]*src=["']([^"']+)["'][^>]*><\/script>/g, (match, src) => {
    if (/^https?:\/\//.test(src)) return match;
    if (src.startsWith('/')) src = src.slice(1);
    const jsPath = path.join(distDir, src);
    if (!fs.existsSync(jsPath)) return match;
    const js = fs.readFileSync(jsPath, 'utf8');
    return `<script type="module">\n${js}\n</script>`;
  });

  // Write output
  fs.writeFileSync(outPath, indexHtml, 'utf8');
  console.log('Wrote single-file HTML to', outPath);
}

inlineDist().catch(err => { console.error(err); process.exit(1); });
