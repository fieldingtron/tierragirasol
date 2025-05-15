import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function sanitizeFilename(filename) {
  const ext = path.extname(filename);
  const name = filename.slice(0, -ext.length);
  
  return (
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '') +
    ext.toLowerCase()
  );
}

async function updateMdxReferences(oldPath, newPath) {
  const mdxFiles = ['content/page/home.mdx'];
  for (const mdxFile of mdxFiles) {
    const content = await fs.readFile(mdxFile, 'utf8');
    const oldPathInMdx = oldPath.replace(/^public/, '');
    const newPathInMdx = newPath.replace(/^public/, '');
    if (content.includes(oldPathInMdx)) {
      const updatedContent = content.replace(new RegExp(oldPathInMdx, 'g'), newPathInMdx);
      await fs.writeFile(mdxFile, updatedContent);
      console.log(`Updated reference in ${mdxFile}: ${oldPathInMdx} -> ${newPathInMdx}`);
    }
  }
}

async function* walkDir(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });
  for (const file of files) {
    const path = `${dir}/${file.name}`;
    if (file.isDirectory()) {
      yield* walkDir(path);
    } else {
      yield path;
    }
  }
}

async function sanitizeFiles() {
  const uploadsDir = path.join(process.cwd(), 'public/uploads');
  let hasChanges = false;

  try {
    for await (const filePath of walkDir(uploadsDir)) {
      const dir = path.dirname(filePath);
      const filename = path.basename(filePath);
      const sanitized = sanitizeFilename(filename);
      
      if (filename !== sanitized) {
        const oldPath = filePath;
        const newPath = path.join(dir, sanitized);
        await fs.rename(oldPath, newPath);
        await updateMdxReferences(oldPath, newPath);
        console.log(`Renamed: ${oldPath} -> ${newPath}`);
        hasChanges = true;
      }
    }

    if (hasChanges) {
      console.log('Files were sanitized and references updated');
      process.exit(1); // Exit with error to prevent commit if files were changed
    } else {
      console.log('No files needed sanitization');
      process.exit(0);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

sanitizeFiles();
