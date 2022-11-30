import React from 'react';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';

const DenyViewLog = () => {
    return (
        <>
            <div>Deny view log</div>

            {Store.viewLogger.denyViewLog.map((info) => {
                return <div key={uuid()}>{JSON.stringify(info)}</div>;
            })}
        </>
    );
};

export default DenyViewLog;
