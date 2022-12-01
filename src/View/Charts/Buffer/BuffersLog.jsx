import { observer } from 'mobx-react-lite';
import React from 'react';

import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import BufferChart from './BufferChart';

const BuffersLog = observer(({ topYOffset, everyItemYOffset }) => {
    console.log(JSON.stringify(Store.viewLogger.bufferViewLog));
    return Store.viewLogger.bufferViewLog.map((value, index) => {
        return (
            <BufferChart
                key={uuid()}
                yOffset={topYOffset + index * everyItemYOffset}
                currentBuffer={value}
            />
        );
    });
});

export default BuffersLog;
