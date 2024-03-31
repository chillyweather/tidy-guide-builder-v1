export async function getCollections(token: string, userId: string) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${userId}/user-collections`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function getCollectionUsers(token: string, collectionId: string) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${collectionId}/users`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function addCollectionUser(
  token: string,
  collectionId: string,
  email: string,
  permission: string
) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email,
    permission,
    collectionId,
  });

  const response = await fetch(
    `http://localhost:3001/api/collections/${collectionId}/users`,
    // `https://api.tidyframework.com/api/collections/${collectionId}/users`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

// let headersList = {
//   "Accept": "*/*",
//   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
//   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDQxZjdmM2FkMGZjYWQ0MWIxOWMyYyIsImlhdCI6MTcxMTc5NjE0MSwiZXhwIjoxNzQzMzMyMTQxfQ.8lk5CeGxxRgeVYoTl0bHoJL7LovMnu4_hhyye5xq_jQ",
//   "Content-Type": "application/json"
//  }
//
//  let bodyContent = JSON.stringify({
//    "email": "d.dzmitryeu@gmail.com",
//    "permission": "Viewer",
//    "collectionId": "66041f7f3ad0fcad41b19c2e"
//  });
//
//  let response = await fetch("http://localhost:3001/api/collections/66041f7f3ad0fcad41b19c2e/users", {
//    method: "POST",
//    body: bodyContent,
//    headers: headersList
//  });
//
//  let data = await response.text();
