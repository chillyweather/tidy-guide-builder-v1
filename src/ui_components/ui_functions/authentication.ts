export async function login(email: string, password: string) {
  const path = "https://api.tidyframework.com/api/users/login";
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export async function createNewAccount(
  name: string,
  email: string,
  password: string,
  company: string
) {
  const path = "https://api.tidyframework.com/api/users/";
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, company }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  console.log("response", response);
  return response.json();
}

export async function getPasswordResetToken(email: string) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email: `${email}`,
  });

  let response = await fetch(
    "https://api.tidyframework.com/api/users/forgetpassword",
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
}

export async function resetPassword(
  email: string,
  token: string,
  newPassword: string,
  confirmPassword: string
) {
  let headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    email: `${email}`,
    token: `${token}`,
    newPassword: `${newPassword}`,
    confirmPassword: `${confirmPassword}`,
  });

  let response = await fetch(
    "https://api.tidyframework.com/api/users/resetpassword",
    {
      method: "PATCH",
      body: bodyContent,
      headers: headersList,
    }
  );

  let data = await response.text();
  return data;
}
