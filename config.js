var config = {}

config.message = process.env.MESSAGE || 'This is a webserver.';
config.port = process.env.PORT || 8000;

module.exports = config;
