const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'site-singlepage.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Check for /assets/ references
const assetRefs = html.match(/["'`]\/assets\/[^"'`]+["'`]/g);
if (assetRefs) {
  console.log(`Found ${assetRefs.length} /assets/ references:`);
  assetRefs.slice(0, 20).forEach(ref => console.log(ref));
} else {
  console.log('No /assets/ references found');
}

// Check for other potential issues
console.log('\n--- Checking for potential issues ---');

// Check if CSS was inlined
if (html.includes('<style>')) {
  console.log('✓ CSS appears to be inlined');
} else {
  console.log('✗ No inline CSS found');
}

// Check if JS was inlined
if (html.includes('<script type="module">')) {
  console.log('✓ JS appears to be inlined');
} else {
  console.log('✗ No inline JS found');
}

// Check for data URIs
const dataUriCount = (html.match(/data:[^"')]+/g) || []).length;
console.log(`✓ Found ${dataUriCount} data URIs`);

// Check for external link tags
const externalLinks = html.match(/<link[^>]*href=["'][^"']+["'][^>]*>/g) || [];
console.log(`\nExternal link tags: ${externalLinks.length}`);
externalLinks.forEach(link => console.log(link));
