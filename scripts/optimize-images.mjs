import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const inputDir = './public/img';
const outputDir = './public/img/optimized';

// Responsive sizes voor verschillende breakpoints
const sizes = {
  hero: [640, 768, 1024, 1280, 1536],
  gallery: [400, 600, 800]
};

async function optimizeImage(inputPath, outputBase, type) {
  const imageSizes = type === 'hero' ? sizes.hero : sizes.gallery;
  
  console.log(`Processing ${inputPath}...`);
  
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  // Originele JPG optimaliseren (als fallback)
  await image
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(`${outputBase}.jpg`);
  
  // WebP versies voor alle sizes
  for (const width of imageSizes) {
    if (width <= metadata.width) {
      await image
        .clone()
        .resize(width, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(`${outputBase}-${width}w.webp`);
    }
  }
  
  // AVIF versies voor alle sizes
  for (const width of imageSizes) {
    if (width <= metadata.width) {
      await image
        .clone()
        .resize(width, null, { withoutEnlargement: true })
        .avif({ quality: 80 })
        .toFile(`${outputBase}-${width}w.avif`);
    }
  }
  
  // Originele grootte AVIF en WebP
  await image
    .clone()
    .webp({ quality: 85 })
    .toFile(`${outputBase}.webp`);
    
  await image
    .clone()
    .avif({ quality: 80 })
    .toFile(`${outputBase}.avif`);
  
  console.log(`✓ Optimized ${outputBase}`);
}

async function main() {
  try {
    const files = await readdir(inputDir);
    const imageFiles = files.filter(f => 
      /\.(jpg|jpeg|JPG|JPEG|png|PNG)$/i.test(f)
    );
    
    console.log(`Found ${imageFiles.length} images to optimize\n`);
    
    for (const file of imageFiles) {
      const inputPath = join(inputDir, file);
      const baseName = file.replace(/\.(jpg|jpeg|JPG|JPEG|png|PNG)$/i, '').toLowerCase();
      const outputBase = join(outputDir, baseName);
      
      const type = baseName === 'hero' ? 'hero' : 'gallery';
      
      await optimizeImage(inputPath, outputBase, type);
    }
    
    console.log('\n✅ All images optimized!');
    console.log(`Output directory: ${outputDir}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();



