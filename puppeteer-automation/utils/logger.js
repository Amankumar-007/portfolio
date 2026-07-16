'use strict';

const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

// Ensure logs directory exists
const logsDir = path.resolve('./logs');
fs.mkdirSync(logsDir, { recursive: true });

/**
 * Mask sensitive fields in log objects (API keys, proxy credentials).
 * @param {object} info - Winston log info
 * @returns {object}
 */
const maskSensitiveData = winston.format((info) => {
  const sensitiveKeys = ['apiKey', 'api_key', 'password', 'pass', 'token', 'secret'];
  const maskObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) return obj;
    const masked = Array.isArray(obj) ? [...obj] : { ...obj };

    for (const key of Object.keys(masked)) {
      if (sensitiveKeys.some((sk) => key.toLowerCase().includes(sk.toLowerCase()))) {
        masked[key] = '***REDACTED***';
      } else if (typeof masked[key] === 'object') {
        masked[key] = maskObject(masked[key]);
      } else if (typeof masked[key] === 'string') {
        // Mask proxy credentials in strings
        masked[key] = masked[key].replace(/(:\/\/[^:]+:)[^@]+(@)/g, '$1***$2');
      }
    }
    return masked;
  };

  return maskObject(info);
});

/**
 * Create the Winston logger instance with console, file, and rotating file transports.
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    maskSensitiveData(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Human-readable console output
    new winston.transports.Console({
      format: winston.format.combine(
        maskSensitiveData(),
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, sessionId, ...meta }) => {
          // Show short UUID portion: 'session_7234b242' → '[sid:7234b242]'
          const rawId = sessionId || '';
          const sid = rawId ? `[sid:${rawId.replace(/^session_/, '').slice(0, 8)}]` : '';
          const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
          return `${timestamp} ${level} ${sid} ${message}${metaStr}`;
        })
      ),
    }),

    // Rotating daily log file (JSON)
    new DailyRotateFile({
      filename: path.join(logsDir, 'automation-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
      maxSize: '100m',
      zippedArchive: true,
      format: winston.format.combine(
        maskSensitiveData(),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),

    // Error-only log file
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      format: winston.format.combine(
        maskSensitiveData(),
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
});

/**
 * Create a child logger scoped to a specific session.
 * @param {string} sessionId
 * @returns {winston.Logger}
 */
logger.createSessionLogger = function (sessionId) {
  return logger.child({ sessionId });
};

module.exports = logger;
