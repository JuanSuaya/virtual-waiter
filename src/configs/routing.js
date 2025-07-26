import Axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";

export const BACKEND = import.meta.env.VITE_BACKEND;
export const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
export const URL_BACKEND = `${BACKEND}:${BACKEND_PORT}/api/v1/`;

const external = "external/"
const internal = "internal/";

export const ROUTES = {
  LOGIN: `${external}login`,
  VALIDATE_TOKEN: `${external}validate`,
  RATE_SERVICE: `${external}service/rate`,
  REGISTER: `${external}workshop/register`,
  GET_ALL_WORKSHOPS: `${external}workshop/addresses/map`,
  FILTER_WORKSHOP: `${external}workshop/addresses/map/find/criteria`,
  CONTACT: `${external}contact`,

};

export const AXIOS_INSTANCE = Axios.create({
  baseURL: URL_BACKEND,
});

AXIOS_INSTANCE.interceptors.request.use(
  (config) => {
    const publicRoutes = [
      ROUTES.LOGIN,
      ROUTES.REGISTER,
      ROUTES.VALIDATE_TOKEN,
      ROUTES.CONTACT
    ];

    // Si la URL termina con una de las rutas públicas, no agregar el token
    const isPublic = publicRoutes.some(route =>
      config.url.endsWith(route)
    );

    if (!isPublic) {
      const { user } = useAuthStore.getState();
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);


[
  {
    
  }
]