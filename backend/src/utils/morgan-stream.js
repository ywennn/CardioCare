import logger from './logger.js';

const morganStream = {
  write: (message) => {
    logger.info(message.trim());
  },
};

export default morganStream;
