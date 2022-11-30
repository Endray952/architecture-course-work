import React from 'react';

import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import SourceChart from './Source';

const SourcesLog = () => {
    return Store.viewLogger.sourceBidsLogView.map((value, index) => {
        return (
            <SourceChart
                key={uuid()}
                yOffset={50 + index * 50}
                currentSource={value}
            />
        );
    });
};

export default SourcesLog;
