function showSalary(users, age) {
  let usersUnderAge = users.filter((user) => {
    return user.age <= age;
  });
  usersUnderAgeMessage = '';
  usersUnderAge.forEach((item) => {
    usersUnderAgeMessage += ( usersUnderAgeMessage !== '' ? '\n' : '' ) + (`${item.name}, ${item.balance}`);
  });
  return usersUnderAgeMessage;
}
