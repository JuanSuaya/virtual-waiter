import { AXIOS_INSTANCE, ROUTES, URL_BACKEND } from "@/configs/routing";

export function fetchEmployees(initPage = null, finishPage = null) {
  return AXIOS_INSTANCE.get(
    URL_BACKEND +
      ROUTES.GET_EMPLOYEES +
      (initPage === null && finishPage === null
        ? ""
        : `?initPage=${initPage}&finishPage=${finishPage}`)
  );
}

export function fetchEmployeesFiltered(body, initPage = null, finishPage = null) {
  return AXIOS_INSTANCE.post(
    URL_BACKEND +
      ROUTES.GET_EMPLOYEES_FILTERED +
      (initPage === null && finishPage === null
        ? ""
        : `?initPage=${initPage}&finishPage=${finishPage}`),
    body
  );
}

export function addNewEmployee(body) {
  return AXIOS_INSTANCE.post(URL_BACKEND + ROUTES.ADD_EMPLOYEE, body);
}

export function editEmployee(body) {
  return AXIOS_INSTANCE.put(URL_BACKEND + ROUTES.ADD_EMPLOYEE, body);
}

export function getEmployee(username) {
  return AXIOS_INSTANCE.get(
    URL_BACKEND + ROUTES.ADD_EMPLOYEE + `?user_name=${username}`
  );
}

export function deleteEmployee(username) {
  return AXIOS_INSTANCE.delete(
    URL_BACKEND + ROUTES.ADD_EMPLOYEE + `?user_name=${username}`
  );
}
