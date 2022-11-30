import React from 'react';
import Store from '../Logic/Store';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';

const Calendar = observer(() => {
    return (
        <>
            <div> Calendar</div>
            {Store.calendar.map((item) => {
                return <div key={uuid()}>{JSON.stringify(item)}</div>;
            })}
        </>
    );
});

export default Calendar;
