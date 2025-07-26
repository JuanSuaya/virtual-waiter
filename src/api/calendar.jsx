import { AXIOS_INSTANCE } from "@/configs/routing";
import { useAuthStore } from "@/store/useAuthStore";
import { ROUTES } from "@/configs/routing";

/**
 * Simulates calendar data fetch from backend
 * @param {string} start - start date in yyyy-MM-dd
 * @param {string} end - end date in yyyy-MM-dd
 */
export function fetchCalendarData(params) {
  const token = useAuthStore.getState().user?.token;

  return AXIOS_INSTANCE.get(ROUTES.CALENDAR_DAY, {
    params, // puede incluir { date } o { start, end }
    headers: { Authorization: `Bearer ${token}` },
  });
}
export function fetchCalendarDataWeek(params) {
  const token = useAuthStore.getState().user?.token;

  return AXIOS_INSTANCE.get(ROUTES.CALENDAR_WEEK, {
    params, // puede incluir { date } o { start, end }
    headers: { Authorization: `Bearer ${token}` },
  });
}


/**
 * Add a new appointment to the calendar
 * @param {Object} cita - Nueva cita
 * @returns {Promise}
 */
export async function createAppointment(cita) {
  const token = useAuthStore.getState().user?.token;
  // console.log(cita);
  if (!cita.start_time) {
    throw new Error("La hora de la cita no está definida");
  }
  const payload = {
    username: cita.client_username,
    employee_username: cita.employee_username,
    description: cita.description,
    start_time: date.toISOString(),
    duration: parseInt(cita.duration),
  };
  console.log("payload => ", payload)
  return AXIOS_INSTANCE.post(ROUTES.APPOINTMENTS, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


