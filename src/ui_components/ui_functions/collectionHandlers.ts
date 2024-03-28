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
