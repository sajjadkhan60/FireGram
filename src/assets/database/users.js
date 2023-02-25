const users = [];

export function add_users(user) {
  console.log(user);
  fetch("http://localhost/testing/index.php", {
    mode: "no-cors",
    method: "POST",
    body: user,
    headers: {
      "Content-type": "application/json;",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  // if (users.length >= 0) {
  //   for (let index = 0; index < users.length; index++) {
  //     if (users[index].email == newUser.email) {
  //       return false;
  //     }
  //   }
  //   users.push(newUser);
  //   return true;
  // }
}

export function auth_User(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newUser = JSON.parse(user);
      if (users.length >= 0) {
        for (let index = 0; index < users.length; index++) {
          if (users[index].email == newUser.email) {
            resolve(true);
          }
        }
        resolve(false);
      }
    }, 200);
  });
}
