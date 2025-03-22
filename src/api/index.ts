import axios from "axios";

// Функция для отправки данных на сервер
interface SendDateRangeArgs {
  startDate: string | null;
  endDate: string | null;
}

export const sendDateRange = async ({
  startDate,
  endDate,
}: SendDateRangeArgs) => {
  const response = await axios.post("/api/dates", { startDate, endDate });
  return response.data;
};
