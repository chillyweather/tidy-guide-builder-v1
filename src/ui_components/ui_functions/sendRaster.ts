import { uploadFileToServer } from "./fileManagementFunctions";
import { useEffect } from "preact/hooks";

export async function sendRaster(
  bytes: Uint8Array,
  loggedInUser: string,
  type: string
) {
  console.log("bytes", bytes);
  const blob = new Blob([bytes], { type: "image/png" });
  const file = new File([blob], `${type}.png`, { type: "image/png" });

  const url = await uploadFileToServer(file, loggedInUser);

  return blob;
}
