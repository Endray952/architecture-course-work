import { observer } from 'mobx-react-lite';
import React from 'react';
import Store from '../Logic/Store';
import { v4 as uuid } from 'uuid';

const Devices = observer(() => {
    return (
        <>
            <div>Devices</div>
            {Store.devices.map((deviceInfo) => {
                return <div key={uuid()}>{JSON.stringify(deviceInfo)}</div>;
            })}
        </>
    );
});

export default Devices;
