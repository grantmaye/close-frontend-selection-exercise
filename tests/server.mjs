import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';

// Test-only server. The application still uses its original, pinned CDN entrypoints.
const root = process.cwd();
const aliases = {
  '/vendor/react.js': 'node_modules/react/umd/react.development.js',
  '/vendor/react-dom.js': 'node_modules/react-dom/umd/react-dom.development.js',
  '/vendor/babel.js': 'node_modules/@babel/standalone/babel.min.js',
};
const server = createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const relative = aliases[pathname] || ({ '/': 'index.html', '/app.jsx': 'app.jsx', '/styles.css': 'styles.css' })[pathname];
  if (!relative) { res.writeHead(404).end(); return; }
  try {
    let data = await readFile(resolve(root, relative));
    if (relative === 'index.html') data = Buffer.from(data.toString()
      .replace('https://unpkg.com/react@18.2.0/umd/react.development.js', '/vendor/react.js')
      .replace('https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js', '/vendor/react-dom.js')
      .replace('https://unpkg.com/@babel/standalone@7.25.6/babel.min.js', '/vendor/babel.js'));
    res.setHeader('Content-Type', extname(relative) === '.css' ? 'text/css' : relative === 'index.html' ? 'text/html' : 'text/javascript');
    res.end(data);
  } catch { res.writeHead(500).end(); }
});
server.listen(0, '127.0.0.1', () => console.log(`PORT=${server.address().port}`));
