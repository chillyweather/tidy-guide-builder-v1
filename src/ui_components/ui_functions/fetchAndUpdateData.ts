/* eslint-disable @typescript-eslint/no-explicit-any */
import { getDocumentations } from "./documentationHandlers";

async function fetchAndUpdateData(token: string, setDataForUpdate: any) {
  const newData = await getDocumentations(token);
  setDataForUpdate(newData);
}

export default fetchAndUpdateData;
