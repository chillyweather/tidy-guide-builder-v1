import { uploadFileToServer } from "./fileManagementFunctions";

export async function sendRaster(
  bytes: Uint8Array,
  loggedInUser: string,
  type: string
) {
  const blob = new Blob([bytes], { type: "image/svg+xml" });
  const file = new File([blob], `${type}.svg`, {
    type: "image/svg+xml",
  });
  const url = await uploadFileToServer(file, loggedInUser);
  console.log("url", url);
  return url;
}
