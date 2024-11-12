export const findUser = (users, user) => {
  const _user = users.find((element) => element.email === user.email);
  return _user;
};
