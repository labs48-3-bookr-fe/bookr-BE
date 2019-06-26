import bcrypt from 'bcrypt';

const Helper = {
  encryptPassword: password => bcrypt.hashSync(password, bcrypt.genSaltSync(6)),

  comparePassword: (password, hashPassword) => bcrypt.compareSync(password, hashPassword)
};
export default Helper;
