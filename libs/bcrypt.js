const bcrypt = require('bcrypt');
module.exports = {
  async create (password) {
    const salt = await bcrypt.genSalt(5);
    return await bcrypt.hash(password, salt, null);   
  },

  async verify (hash, password) {
    return await bcrypt.compare(password, hash);
  }
}
