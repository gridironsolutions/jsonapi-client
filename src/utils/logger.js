import pino from 'pino';

const logger = pino({
    name: process.env.npm_package_name ? process.env.npm_package_name : 'nodejs_app',
    level: process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info',
});

export default logger;