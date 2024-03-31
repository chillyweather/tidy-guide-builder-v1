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
    `https://api.tidyframework.com/api/collections/${collectionId}/users`,
    {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}

export async function deleteCollectionUser(
  token: string,
  collectionId: string,
  email: string
) {
  const headersList = {
    Accept: "*/*",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const bodyContent = JSON.stringify({
    email,
    collectionId,
  });

  const response = await fetch(
    `https://api.tidyframework.com/api/collections/${collectionId}/users`,
    {
      method: "DELETE",
      body: bodyContent,
      headers: headersList,
    }
  );

  const data = await response.json();
  return data;
}
