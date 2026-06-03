/* Servidor estático SOLO para previsualizar en local (node tools/preview-server.cjs).
   No se usa en producción: en Hostinger basta con subir los archivos. */
const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const port = process.env.PORT || 8765;

const mimes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
  ".png": "image/png", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff"
};

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p === "/") p = "/index.html";
  const fp = path.join(root, p);
  if (!fp.startsWith(root)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.stat(fp, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end("<h1>404</h1>");
    }
    res.writeHead(200, {
      "Content-Type": mimes[path.extname(fp).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    fs.createReadStream(fp).pipe(res);
  });
}).listen(port, () => console.log("Preview en http://localhost:" + port));
