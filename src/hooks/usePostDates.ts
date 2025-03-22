import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendDateRange } from "../api";
import { RangePickerProps } from "antd/es/date-picker";
import { useDateStore } from "../store/dateStore";
import { message } from "antd";

export const usePostData = () => {
  const { setDateRange } = useDateStore();
  // Мутация для отправки данных
  const mutation = useMutation({
    mutationFn: sendDateRange,
  });

  const queryClient = useQueryClient();
  const handleDateChange: RangePickerProps["onChange"] = (
    dates,
    dateStrings
  ) => {
    const [startDate, endDate] = dateStrings;

    // Сохраняем даты в Zustand
    setDateRange([startDate || null, endDate || null]);

    // Отправляем диапазон на сервер
    mutation.mutate(
      { startDate, endDate },
      {
        onSuccess() {
          queryClient.invalidateQueries();
          console.log({ startDate, endDate });
        },
        onError() {
          console.log({ startDate, endDate });
        },
      }
    );
  };

  return {
    handleDateChange,
  };
};
