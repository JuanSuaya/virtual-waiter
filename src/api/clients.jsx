import { AXIOS_INSTANCE, ROUTES, URL_BACKEND } from "@/configs/routing";

export function fetchClients(initPage = null, finishPage = null) {
  return AXIOS_INSTANCE.get(
    URL_BACKEND +
      ROUTES.GET_CLIENTS +
      (initPage === null && finishPage === null
        ? ""
        : `?initPage=${initPage}&finishPage=${finishPage}`)
  );
}

export function fetchClientsFiltered(body, initPage = null, finishPage = null) {
  return AXIOS_INSTANCE.post(
    URL_BACKEND +
      ROUTES.GET_CLIENTS_FILTERED +
      (initPage === null && finishPage === null
        ? ""
        : `?initPage=${initPage}&finishPage=${finishPage}`),
    body
  );
}

export function addNewClient(body) {
  return AXIOS_INSTANCE.post(URL_BACKEND + ROUTES.ADD_CLIENT, body);
}

export function editClient(body) {
  return AXIOS_INSTANCE.put(URL_BACKEND + ROUTES.ADD_CLIENT, body);
}

export function getClient(id) {
  return AXIOS_INSTANCE.get(
    URL_BACKEND + ROUTES.ADD_CLIENT + `?id=${id}`
  );
}

export function deleteClient(id) {
  return AXIOS_INSTANCE.delete(
    URL_BACKEND + ROUTES.ADD_CLIENT + `?id=${id}`
  );
} 