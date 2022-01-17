const crypto = require('crypto');

exports.getNewUUID = () => {
  return crypto.randomUUID({disableEntropyCache : false}).toString();
};
