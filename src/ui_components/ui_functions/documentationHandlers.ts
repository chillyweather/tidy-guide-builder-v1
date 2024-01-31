//! create documentation
export async function createDocumentation(token: string, body: any) {
  const path = `https://api.tidyframework.com/api/docs`;
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

//! update documentation
export async function updateDocumentation(
  token: string,
  documentId: string,
  body: any
) {
  const path = `https://api.tidyframework.com/api/docs/${documentId}`;
  const response = await fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

//! get one documentation
export async function getDocumentation(token: string, documentId: string) {
  console.log("token", token);
  console.log("documentId", documentId);
  let headersList = {
    Accept: "*/*",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(
    `https://api.tidyframework.com/api/docs/${documentId}`,
    {
      method: "GET",
      headers: headersList,
    }
  );

  let data = await response.json();
  return data;
}

//! get all documentations
export async function getDocumentations(token: string) {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "https://api.tidyframework.com/api/docs",
    requestOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

//! get IDs and names of all documentations
export async function getTitlesAndIds(token: string) {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  let requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(
    "https://api.tidyframework.com/api/docs/tuples",
    requestOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
}

//! delete documentation
export async function deleteDocumentation(token: string, documentId: string) {
  const path = `https://api.tidyframework.com/api/docs/${documentId}`;
  const response = await fetch(path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.status;
}
