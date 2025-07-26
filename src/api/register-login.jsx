import { AXIOS_INSTANCE, ROUTES } from "@/configs/routing";
import { useAuthStore } from "@/store/useAuthStore";

export async function userLogIn(username, password) {
  try {
    const response = await AXIOS_INSTANCE.post(ROUTES.LOGIN, {
      username,
      password,
    });

    const { token, is_client } = response.data.response;
    useAuthStore.getState().login({ token, username, is_client });

    return { token, is_client };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Error al iniciar sesión";
    // console.error("Login failed:", message);
    throw new Error(message); // Rethrow with consistent message
  }
}


export function fetchRegister(body) {
  return AXIOS_INSTANCE.post(
  URL_BACKEND + ROUTES.REGISTER, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}