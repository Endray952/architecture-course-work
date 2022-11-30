import React from 'react';
import { v4 as uuid } from 'uuid';

const DenyLog = ({ denyLog }) => {
    return (
        <>
            <div>Deny Log</div>

            {denyLog.map((info) => {
                return <div key={uuid()}>{JSON.stringify(info)}</div>;
            })}
        </>
    );
};

export default DenyLog;
