import fs from 'node:fs';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';

async function run() {
  const srcPath = 'app/globals.src.css';
  const outPath = 'app/globals.css';
  
  if (!fs.existsSync(srcPath)) {
    console.warn(`Source CSS ${srcPath} does not exist, skipping.`);
    return;
  }
  
  const css = fs.readFileSync(srcPath, 'utf-8');
  console.log(`Compiling ${srcPath} (${css.length} bytes)...`);
  const result = await postcss([tailwind()]).process(css, { from: srcPath });
  fs.writeFileSync(outPath, result.css);
  console.log(`Successfully compiled to ${outPath} (${result.css.length} bytes).`);
}

run().catch(err => {
  console.error('Failed to compile CSS:', err);
  process.exit(1);
});

