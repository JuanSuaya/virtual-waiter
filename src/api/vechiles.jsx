import { AXIOS_INSTANCE, ROUTES, URL_BACKEND } from "@/configs/routing";

export function getVehicles(pageNumber, pageSize) {
    return AXIOS_INSTANCE.get(`${URL_BACKEND + ROUTES.GET_VEHICLES}?initPage=${pageNumber}&finishPage=${pageSize}`);
}
