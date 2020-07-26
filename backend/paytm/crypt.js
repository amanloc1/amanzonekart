const crypto = require('crypto');
const util = require('util');

const crypt = {
  iv: '@@@@&&&&####$$$$',

  encrypt(data, custom_key) {
    const { iv } = this;
    const key = custom_key;
    let algo = '256';
    switch (key.length) {
      case 16:
        algo = '128';
        break;
      case 24:
        algo = '192';
        break;
      case 32:
        algo = '256';
        break;
    }
    const cipher = crypto.createCipheriv(`AES-${algo}-CBC`, key, iv);
    // var cipher = crypto.createCipher('aes256',key);
    let encrypted = cipher.update(data, 'binary', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  },

  decrypt(data, custom_key) {
    const { iv } = this;
    const key = custom_key;
    let algo = '256';
    switch (key.length) {
      case 16:
        algo = '128';
        break;
      case 24:
        algo = '192';
        break;
      case 32:
        algo = '256';
        break;
    }
    const decipher = crypto.createDecipheriv(`AES-${algo}-CBC`, key, iv);
    let decrypted = decipher.update(data, 'base64', 'binary');
    try {
      decrypted += decipher.final('binary');
    } catch (e) {
      util.log(util.inspect(e));
    }
    return decrypted;
  },

  gen_salt(length, cb) {
    crypto.randomBytes((length * 3.0) / 4.0, (err, buf) => {
      let salt;
      if (!err) {
        salt = buf.toString('base64');
      }
      // salt=Math.floor(Math.random()*8999)+1000;
      cb(err, salt);
    });
  },

  /* one way md5 hash with salt */
  md5sum(salt, data) {
    return crypto.createHash('md5').update(salt + data).digest('hex');
  },
  sha256sum(salt, data) {
    return crypto.createHash('sha256').update(data + salt).digest('hex');
  },
};

module.exports = crypt;

(function () {
  let i;

  function logsalt(err, salt) {
    if (!err) {
      console.log(`salt is ${salt}`);
    }
  }

  if (require.main === module) {
    const enc = crypt.encrypt('One97');
    console.log(`encrypted - ${enc}`);
    console.log(`decrypted - ${crypt.decrypt(enc)}`);

    for (i = 0; i < 5; i++) {
      crypt.gen_salt(4, logsalt);
    }
  }
}());
