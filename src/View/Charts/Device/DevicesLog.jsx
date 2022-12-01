import { observer } from 'mobx-react-lite';
import React from 'react';

import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import DeviceChart from './DeviceChart';

const DevicesLog = observer(({ topYOffset, everyItemYOffset }) => {
    // console.log(Store.viewLogger.deviceLogView.length);
    return Store.viewLogger.deviceLogView.map((value, index) => {
        return (
            <DeviceChart
                key={uuid()}
                yOffset={topYOffset + index * everyItemYOffset}
                currentDevice={value}
            />
        );
    });
});

export default DevicesLog;
