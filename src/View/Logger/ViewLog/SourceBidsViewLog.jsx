import React from 'react';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';

const SourceBidsViewLog = () => {
    return (
        <>
            <div>Source Bids View Log</div>

            {Store.viewLogger.sourceBidsLogView.map((info) => {
                return <div key={uuid()}>{JSON.stringify(info)}</div>;
            })}
        </>
    );
};

export default SourceBidsViewLog;
