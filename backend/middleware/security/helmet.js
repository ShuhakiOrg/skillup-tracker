const helmet = require('helmet');

const helmetMiddleware = helmet({
    contentSecurityPolicy: false,
    hidePoweredBy: true,
    hsts: { maxAge: 31536000 },
    frameguard: { action: 'deny' },
    noSniff: true
});

module.exports = helmetMiddleware;