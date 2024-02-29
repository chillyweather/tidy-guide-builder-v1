import { emit } from "@create-figma-plugin/utilities";

/**
 * Handles the token and email values for authentication.
 * If a token is provided, it is stored in the client storage along with the email.
 * If no token is provided, it retrieves the saved token and email from the client storage.
 * Emits an "AUTH_CHANGE" event with the token and email values.
 * Returns the saved token if both token and email are present in the client storage, otherwise returns null.
 * @param token - The token value to be stored in the client storage.
 * @param email - The email value to be stored in the client storage.
 * @returns The saved token if both token and email are present, otherwise null.
 */
export async function tokenAndEmailHandler(token?: string, email?: string) {
  if (token) {
    await figma.clientStorage.setAsync("token", token);
    await figma.clientStorage.setAsync("email", email);

    emit("AUTH_CHANGE", token, email);

    console.log("token set :>> ", token);
    console.log("email set :>> ", email);
  } else {
    const savedToken = await figma.clientStorage.getAsync("token");
    const savedEmail = await figma.clientStorage.getAsync("email");

    // console.log("savedToken", savedToken);
    // console.log("savedEmail", savedEmail);

    if (savedToken && savedEmail) {
      emit("AUTH_CHANGE", savedToken, savedEmail);
    } else {
      emit("AUTH_CHANGE", null);
    }
  }
}
