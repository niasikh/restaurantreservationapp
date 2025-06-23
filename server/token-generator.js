const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function generateToken() {
  const settings = JSON.parse(fs.readFileSync(path.join(__dirname, '../config/settings_data.json')));
  const { team_id, key_id, private_key } = settings.current.mapkit_js;

  // Token expires in 30 minutes
  const exp = Math.floor(Date.now() / 1000) + (30 * 60);
  
  const token = jwt.sign({
    iss: team_id,
    iat: Math.floor(Date.now() / 1000),
    exp: exp
  }, private_key, {
    algorithm: 'ES256',
    header: {
      alg: 'ES256',
      kid: key_id,
      typ: 'JWT'
    }
  });

  return token;
}

module.exports = generateToken; 