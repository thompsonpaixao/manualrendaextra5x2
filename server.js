/**
 * MANUAL RENDA EXTRA 5X2 - SERVIDOR HTTP NATIVO NODE.JS
 * Zero dependências externas necessárias.
 * Mapeia as rotas limpas do ecossistema:
 *  - /alimentacao
 *  - /na-rua
 *  - /digital
 *  - /artesanato
 *  - /checkout
 *  - /dashboard
 *  - / (Central Hub)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const ROUTE_MAP = {
  '/': 'index.html',
  '/alimentacao': 'alimentacao.html',
  '/na-rua': 'na-rua.html',
  '/digital': 'digital.html',
  '/artesanato': 'artesanato.html',
  '/checkout': 'checkout.html',
  '/dashboard': 'dashboard.html'
};

const server = http.createServer((req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = reqUrl.pathname;

  // Remove barra final se não for a raiz
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  // Verifica se é uma rota limpa mapeada
  let targetFile = ROUTE_MAP[pathname];

  if (!targetFile) {
    // Tenta servir o arquivo estático diretamente de public/
    targetFile = pathname.startsWith('/') ? pathname.slice(1) : pathname;
  }

  const filePath = path.join(PUBLIC_DIR, targetFile);

  // Prevenção de Path Traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 Proibido');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Se não achar, tenta com extensão .html
      const htmlFallback = filePath + '.html';
      fs.stat(htmlFallback, (errHtml, statsHtml) => {
        if (!errHtml && statsHtml.isFile()) {
          serveFile(res, htmlFallback, '.html');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.end(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <title>404 - Página Não Encontrada</title>
              <link rel="stylesheet" href="/css/style.css">
              <style>
                body { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; text-align: center; }
              </style>
            </head>
            <body>
              <div class="bento-card" style="max-width: 500px; padding: 3rem;">
                <h1 style="font-size: 3rem; color: #DC2626; margin-bottom: 0.5rem;">404</h1>
                <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Página Não Encontrada</h2>
                <p style="color: #64748B; margin-bottom: 2rem;">A rota solicitada não existe no ecossistema do Manual Renda Extra 5x2.</p>
                <a href="/" class="btn-primary-pulse" style="font-size: 0.95rem; padding: 0.8rem 1.6rem;">Voltar ao Hub Geral</a>
              </div>
            </body>
            </html>
          `);
        }
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    serveFile(res, filePath, ext);
  });
});

function serveFile(res, filePath, ext) {
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('500 Erro Interno do Servidor');
      return;
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache'
    });
    res.end(content);
  });
}

server.listen(PORT, () => {
  console.log(`====================================================================`);
  console.log(`🚀 ECOSSISTEMA "MANUAL RENDA EXTRA 5X2" INICIADO COM SUCESSO!`);
  console.log(`🌐 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`--------------------------------------------------------------------`);
  console.log(`📍 Rotas Principais Disponíveis:`);
  console.log(`   - Hub Central:      http://localhost:${PORT}/`);
  console.log(`   - Alimentação:      http://localhost:${PORT}/alimentacao`);
  console.log(`   - Venda na Rua:     http://localhost:${PORT}/na-rua`);
  console.log(`   - Digital Dark:     http://localhost:${PORT}/digital`);
  console.log(`   - Artesanato:       http://localhost:${PORT}/artesanato`);
  console.log(`   - Checkout Padrão:  http://localhost:${PORT}/checkout`);
  console.log(`   - Área de Membros:  http://localhost:${PORT}/dashboard`);
  console.log(`====================================================================`);
});
