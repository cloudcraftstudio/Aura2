const fs = require('fs');
const htmlPath = 'index.html';
let html = fs.readFileSync(htmlPath, 'utf-8');

const loggerScript = `
    <script>
      window.onerror = function(msg, url, line, col, error) {
        var errDiv = document.getElementById('debug-error-overlay');
        if (!errDiv) {
          errDiv = document.createElement('div');
          errDiv.id = 'debug-error-overlay';
          errDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:rgba(200,0,0,0.9);color:white;z-index:999999;padding:20px;font-family:monospace;font-size:12px;overflow:auto;max-height:100vh;';
          document.body.appendChild(errDiv);
        }
        errDiv.innerHTML += '<p><b>Error:</b> ' + msg + '<br><b>Line:</b> ' + line + '<br><b>URL:</b> ' + url + '</p>';
        return false;
      };
      window.addEventListener('unhandledrejection', function(event) {
        var errDiv = document.getElementById('debug-error-overlay');
        if (!errDiv) {
          errDiv = document.createElement('div');
          errDiv.id = 'debug-error-overlay';
          errDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:rgba(200,0,0,0.9);color:white;z-index:999999;padding:20px;font-family:monospace;font-size:12px;overflow:auto;max-height:100vh;';
          document.body.appendChild(errDiv);
        }
        errDiv.innerHTML += '<p><b>Promise Rejection:</b> ' + (event.reason ? (event.reason.message || event.reason) : 'Unknown') + '</p>';
      });
    </script>
`;

if (!html.includes('debug-error-overlay')) {
  html = html.replace('</head>', loggerScript + '</head>');
  fs.writeFileSync(htmlPath, html);
  console.log('Injected error logger into index.html');
}
