import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function buildZip() {
  const zip = new JSZip();
  const distDir = path.resolve('dist');

  function addDirToZip(currentDir, zipFolder) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        const subFolder = zipFolder.folder(file);
        addDirToZip(filePath, subFolder);
      } else {
        const content = fs.readFileSync(filePath);
        zipFolder.file(file, content);
      }
    }
  }

  console.log('Packaging dist into zip...');
  addDirToZip(distDir, zip);

  const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });
  const outputPath = path.resolve('public/yam-scripts-app.zip');
  fs.writeFileSync(outputPath, content);
  console.log('Created public/yam-scripts-app.zip successfully! Size:', (content.length / 1024 / 1024).toFixed(2), 'MB');
}

buildZip().catch(err => {
  console.error('Failed to create zip:', err);
  process.exit(1);
});
