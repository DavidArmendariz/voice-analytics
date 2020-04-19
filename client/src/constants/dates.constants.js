import { millisecondsPerDay } from "constants/math.constants";

const today = new Date();
today.setHours(23, 59, 59);
const lastWeek = new Date(today.getTime() - 7 * millisecondsPerDay);
lastWeek.setHours(0, 0, 0);

export { today, lastWeek };
