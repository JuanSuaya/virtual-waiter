import { AXIOS_INSTANCE, ROUTES, URL_BACKEND } from "@/configs/routing";

export function postNewCar(body) {
  return AXIOS_INSTANCE.post(URL_BACKEND + ROUTES.CREATE_CAR, body);
}

export function fetchBrands() {
  return AXIOS_INSTANCE.get(URL_BACKEND + ROUTES.GET_BRAND);
}

export function fetchModels(id) {
  return AXIOS_INSTANCE.get(`${URL_BACKEND + ROUTES.GET_MODEL}?id=${id}`);
}

export function addModel(body) {
  return AXIOS_INSTANCE.post(URL_BACKEND + ROUTES.ADD_MODEL, body);
}