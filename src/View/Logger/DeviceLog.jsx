import React from 'react';
import { v4 as uuid } from 'uuid';

const DeviceLog = ({ deviceLog }) => {
    return (
        <>
            <div>Device Log</div>

            {deviceLog.map((device) => {
                return <div key={uuid()}>{JSON.stringify(device)}</div>;
            })}
        </>
    );
};

export default DeviceLog;
