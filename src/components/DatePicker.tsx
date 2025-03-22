// components/DatePicker.tsx
import React from "react";
import { DatePicker } from "antd";
import { usePostData } from "../hooks/usePostDates";

const { RangePicker } = DatePicker;

const CustomDatePicker: React.FC = () => {
  const { handleDateChange } = usePostData();

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: "20px" }}>
      <RangePicker
        onChange={handleDateChange}
        format="YYYY-MM-DD"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default CustomDatePicker;
