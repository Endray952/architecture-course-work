import React from 'react';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';

const DeviceViewLog = () => {
    return (
        <>
            <div>Device View Log</div>

            {Store.viewLogger.deviceLogView.map((info) => {
                return <div key={uuid()}>{JSON.stringify(info)}</div>;
            })}
        </>
    );
};

export default DeviceViewLog;
