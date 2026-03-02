const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

function setupSecurity(app) {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));

  app.use(cors({
    origin: process.env.NODE_ENV === 'production'
      ? false
      : ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['POST'],
    maxAge: 86400,
  }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many requests. Please try again later.' },
  });

  app.use('/api/', limiter);

  app.disable('x-powered-by');
}

module.exports = { setupSecurity };
