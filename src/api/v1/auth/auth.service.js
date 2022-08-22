import User from './user';

const AuthService = {};

AuthService.fetchUser = async query => {
  const user = await User.findOne(query);

  return user;
};
AuthService.createUser = async query => {
  const user = await User.create(query);

  return user;
};

export default AuthService;
