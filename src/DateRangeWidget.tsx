import React, { useState } from 'react';
import { DatePicker, Button, Space, Typography } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

type Dates = [dayjs.Dayjs | null, dayjs.Dayjs | null] | null


const DateRangeWidget: React.FC = () => {
  const [dates, setDates] = useState<Dates>(null);
  const [showPicker, setShowPicker] = useState(false);
  // Вспомогательная функция форматирования даты
  const formatDate = (date: dayjs.Dayjs) => {
    return date.format('DD.MM.YY');
  };

  const getContent = () => {
    const nowDate = dayjs()
    if (dates) {
        const [start, end] = dates
        if (start && end) {
          console.log(formatDate(start) === formatDate(nowDate))
          // console.log({
          //   startDate:  formatDate(start), 
          //   endDate: formatDate(end), 
          //   nowDate: formatDate(nowDate)
          // })

        }
    }
  }

  
  const content = getContent()
  // Форматирование отображения даты
  const formatDateDisplay = () => {
    if (!dates) {
      const now = dayjs();
      return formatDate(now);
    }
    
    const [start, end] = dates;
    if (start && end) {
      // Если даты равны, показываем одну дату
      if (start.isSame(end, 'day')) {
        return formatDate(start);
      }
      // Иначе показываем диапазон
      return `${formatDate(start)}-${formatDate(end)}`;
    }
    return '';
  };

  // Вспомогательная функция форматирования даты
  // const formatDate = (date: dayjs.Dayjs) => {
  //   return date.format('DD.MM.YY');
  // };

  // Обработчик изменения дат
  const handleDateChange: RangePickerProps['onChange'] = (values) => {
    if (values) {
      setDates([values[0], values[1]]);
    } else {
      setDates(null);
    }
    console.log(content);
  };

  // Отправка данных на сервер
  const handleSubmit = async () => {
    if (dates) {
      const [start, end] = dates;
      const dateRange = {
        startDate: start?.format('YYYY-MM-DD'),
        endDate: end?.format('YYYY-MM-DD'),
      };
      
      try {
        // const response = await fetch('/api/dates', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify(dateRange),
        // });
        console.log(dateRange);
        
        setShowPicker(false);
      } catch (error) {
        console.error('Error sending dates:', error);
      }
    }
  };

  return (
    <div style={{ width: 'fit-content', border: '1px solid #d9d9d9', borderRadius: '6px', padding: '12px', position: 'relative' }}>
      <div onClick={() => setShowPicker(!showPicker)} style={{ cursor: 'pointer' }}>
        <Typography.Paragraph>в виджетах данные за</Typography.Paragraph>
        <Space direction="vertical">
          <span>{formatDateDisplay()}</span>
          <Button type="link">Настроить</Button>
        </Space>
      </div>
      
      {showPicker && (
        <div style={{ marginTop: '12px', position: 'absolute', left: 0 }}>
          <Space direction="vertical">
            <RangePicker
              onChange={handleDateChange}
              format="DD.MM.YY"
              value={dates}
              // defaultValue={dates? [dates.start, dates.end] as [Dayjs, Dayjs] : [dayjs(), dayjs()]}
            /> 
            <Button type="primary" onClick={handleSubmit}>
              Применить
            </Button>
          </Space>
        </div>
      )}
    </div>
  );
};

export default DateRangeWidget;