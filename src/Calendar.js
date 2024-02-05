// Calendar.js

import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ entries, startDate, targetDate , onDayClick}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // months are zero-indexed
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
  };

  const handleDayClick = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onDayClick(date);
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    const daysArray = Array.from({ length: totalDays }, (_, index) => index + 1);
    const emptyDaysArray = Array.from({ length: firstDay }, (_, index) => null);

    const allDays = [...emptyDaysArray, ...daysArray];


    return allDays.map((day, index) => {
       const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
       const isBetweenDates = (date >= startDate && date <= targetDate);
       const isTargetDate = date.toDateString() === targetDate.toDateString();

       let classNames = 'day';
       if (day === null) {
         classNames += ' empty';
       } else if (isBetweenDates) {
         classNames += ' between-dates';
       }

       if (isTargetDate) {
        classNames += ' target-date';
       }

       return (
         <div key={index} className={classNames} onClick={() => handleDayClick(day)}>
           {day}
         </div>
       );
     });
   };
  const nextMonth = () => {
    const nextMonthDate = new Date(currentDate);
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    setCurrentDate(nextMonthDate);
  };

  const prevMonth = () => {
    const prevMonthDate = new Date(currentDate);
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
    setCurrentDate(prevMonthDate);
  };

  return (
    <div className="calendar">
      <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <div className="days">
        <div className="day-label">Sun</div>
        <div className="day-label">Mon</div>
        <div className="day-label">Tue</div>
        <div className="day-label">Wed</div>
        <div className="day-label">Thu</div>
        <div className="day-label">Fri</div>
        <div className="day-label">Sat</div>
        {renderCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
