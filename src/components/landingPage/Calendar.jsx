import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import React from 'react';

export default function CalendarComponent() {
    const [value, onChange] = React.useState(new Date());
    
    return (
        <div className="calendar">
        <Calendar
            onChange={onChange}
            value={value}
            className="w-1/2 mx-auto"
        />
        </div>
    );
}