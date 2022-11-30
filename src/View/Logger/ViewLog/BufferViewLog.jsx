import React from 'react';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';

const BufferViewLog = () => {
    return (
        <>
            <div>Buffer view Log</div>

            {Store.viewLogger.bufferViewLog.map((info) => {
                return <div key={uuid()}>{JSON.stringify(info)}</div>;
            })}
        </>
    );
};

export default BufferViewLog;
