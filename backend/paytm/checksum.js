const util = require('util');
const crypto = require('crypto');
const crypt = require('./crypt');

// mandatory flag: when it set, only mandatory parameters are added to checksum

function paramsToString(params, mandatoryflag) {
  let data = '';
  const tempKeys = Object.keys(params);
  tempKeys.sort();
  tempKeys.forEach((key) => {
    const n = params[key].includes('REFUND');
    const m = params[key].includes('|');
    if (n == true) {
      params[key] = '';
    }
    if (m == true) {
      params[key] = '';
    }
    if (key !== 'CHECKSUMHASH') {
      if (params[key] === 'null') params[key] = '';
      if (!mandatoryflag || mandatoryParams.indexOf(key) !== -1) {
        data += (`${params[key]}|`);
      }
    }
  });
  return data;
}

function genchecksum(params, key, cb) {
  const data = paramsToString(params);
  crypt.gen_salt(4, (err, salt) => {
    const sha256 = crypto.createHash('sha256').update(data + salt).digest('hex');
    const check_sum = sha256 + salt;
    const encrypted = crypt.encrypt(check_sum, key);
    cb(undefined, encrypted);
  });
}
function genchecksumbystring(params, key, cb) {
  crypt.gen_salt(4, (err, salt) => {
    const sha256 = crypto.createHash('sha256').update(`${params}|${salt}`).digest('hex');
    const check_sum = sha256 + salt;
    const encrypted = crypt.encrypt(check_sum, key);

    let CHECKSUMHASH = encodeURIComponent(encrypted);
    CHECKSUMHASH = encrypted;
    cb(undefined, CHECKSUMHASH);
  });
}

function verifychecksum(params, key, checksumhash) {
  const data = paramsToString(params, false);

  // TODO: after PG fix on thier side remove below two lines
  if (typeof checksumhash !== 'undefined') {
    checksumhash = checksumhash.replace('\n', '');
    checksumhash = checksumhash.replace('\r', '');
    const temp = decodeURIComponent(checksumhash);
    const checksum = crypt.decrypt(temp, key);
    const salt = checksum.substr(checksum.length - 4);
    const sha256 = checksum.substr(0, checksum.length - 4);
    const hash = crypto.createHash('sha256').update(data + salt).digest('hex');
    if (hash === sha256) {
      return true;
    }
    util.log('checksum is wrong');
    return false;
  }
  util.log('checksum not found');
  return false;
}

function verifychecksumbystring(params, key, checksumhash) {
  const checksum = crypt.decrypt(checksumhash, key);
  const salt = checksum.substr(checksum.length - 4);
  const sha256 = checksum.substr(0, checksum.length - 4);
  const hash = crypto.createHash('sha256').update(`${params}|${salt}`).digest('hex');
  if (hash === sha256) {
    return true;
  }
  util.log('checksum is wrong');
  return false;
}

function genchecksumforrefund(params, key, cb) {
  const data = paramsToStringrefund(params);
  crypt.gen_salt(4, (err, salt) => {
    const sha256 = crypto.createHash('sha256').update(data + salt).digest('hex');
    const check_sum = sha256 + salt;
    const encrypted = crypt.encrypt(check_sum, key);
    params.CHECKSUM = encodeURIComponent(encrypted);
    cb(undefined, params);
  });
}

function paramsToStringrefund(params, mandatoryflag) {
  let data = '';
  const tempKeys = Object.keys(params);
  tempKeys.sort();
  tempKeys.forEach((key) => {
    const m = params[key].includes('|');
    if (m == true) {
      params[key] = '';
    }
    if (key !== 'CHECKSUMHASH') {
      if (params[key] === 'null') params[key] = '';
      if (!mandatoryflag || mandatoryParams.indexOf(key) !== -1) {
        data += (`${params[key]}|`);
      }
    }
  });
  return data;
}

module.exports.genchecksum = genchecksum;
module.exports.verifychecksum = verifychecksum;
module.exports.verifychecksumbystring = verifychecksumbystring;
module.exports.genchecksumbystring = genchecksumbystring;
module.exports.genchecksumforrefund = genchecksumforrefund;
