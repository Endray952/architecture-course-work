import React from 'react';
import { v4 as uuid } from 'uuid';

const SourceLog = ({ sourceLog }) => {
    return (
        <>
            <div>Source Log</div>

            {sourceLog.map((source) => {
                return <div key={uuid()}>{JSON.stringify(source)}</div>;
            })}
        </>
    );
};

export default SourceLog;
