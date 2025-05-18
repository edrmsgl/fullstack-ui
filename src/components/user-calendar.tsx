'use client';
import React, { useState } from 'react'
import Title from './title'
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const UserCalendar = ({ title }: { title: string }) => {
    const [value, onChange] = useState<Value>(new Date());
    return (
        <div className='bg-white rounded-2xl w-full p-4'>
            <Title title={title} />
            <Calendar onChange={onChange} value={value} />
        </div>
    )
}

export default UserCalendar;