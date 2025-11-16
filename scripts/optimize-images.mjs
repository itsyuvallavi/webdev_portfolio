import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, dirname, extname, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const publicDir = join(__dirname, '../public');
const targetDirs = ['nomadai', 'ebnflow', 'filmcomposer', 'frontier', 'hangdrum', 'frozenreverb'];

async function optimizeImage(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const inputStats = await stat(inputPath);
    const savings = ((inputStats.size - info.size) / inputStats.size * 100).toFixed(1);

    console.log(`✓ ${basename(inputPath)} → ${basename(outputPath)}`);
    console.log(`  ${(inputStats.size / 1024 / 1024).toFixed(2)}MB → ${(info.size / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)\n`);

    return { original: inputStats.size, optimized: info.size };
  } catch (error) {
    console.error(`✗ Error optimizing ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dirPath) {
  const files = await readdir(dirPath);
  const stats = { totalOriginal: 0, totalOptimized: 0, count: 0 };

  for (const file of files) {
    const filePath = join(dirPath, file);
    const ext = extname(file).toLowerCase();

    // Only process PNG and JPG files
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

    const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    const result = await optimizeImage(filePath, outputPath);
    if (result) {
      stats.totalOriginal += result.original;
      stats.totalOptimized += result.optimized;
      stats.count++;
    }
  }

  return stats;
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  let grandTotal = { totalOriginal: 0, totalOptimized: 0, count: 0 };

  for (const dir of targetDirs) {
    const dirPath = join(publicDir, dir);

    try {
      await stat(dirPath);
      console.log(`📁 Processing ${dir}/...`);
      const stats = await processDirectory(dirPath);

      grandTotal.totalOriginal += stats.totalOriginal;
      grandTotal.totalOptimized += stats.totalOptimized;
      grandTotal.count += stats.count;

    } catch (error) {
      console.log(`⊘  Skipping ${dir}/ (not found)\n`);
    }
  }

  // Also optimize portrait.jpg
  try {
    const portraitPath = join(publicDir, 'portrait.jpg');
    const portraitOutput = join(publicDir, 'portrait.webp');
    console.log('📁 Processing portrait.jpg...');
    const result = await optimizeImage(portraitPath, portraitOutput);
    if (result) {
      grandTotal.totalOriginal += result.original;
      grandTotal.totalOptimized += result.optimized;
      grandTotal.count++;
    }
  } catch (error) {
    console.log('⊘  No portrait.jpg found\n');
  }

  console.log('═══════════════════════════════════════');
  console.log('✨ Optimization Complete!');
  console.log(`📊 Total files: ${grandTotal.count}`);
  console.log(`📉 Original size: ${(grandTotal.totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`📈 Optimized size: ${(grandTotal.totalOptimized / 1024 / 1024).toFixed(2)}MB`);
  console.log(`💾 Total saved: ${(((grandTotal.totalOriginal - grandTotal.totalOptimized) / 1024 / 1024)).toFixed(2)}MB (${((grandTotal.totalOriginal - grandTotal.totalOptimized) / grandTotal.totalOriginal * 100).toFixed(1)}%)`);
  console.log('═══════════════════════════════════════\n');

  console.log('⚠️  Note: Original PNG/JPG files are kept. Update your code to use .webp extensions, then delete originals manually if desired.');
}

main().catch(console.error);
