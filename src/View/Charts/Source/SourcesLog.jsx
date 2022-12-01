import { observer } from 'mobx-react-lite';
import React from 'react';

import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import SourceChart from './SourceChart';

const SourcesLog = observer(({ topYOffset, everyItemYOffset }) => {
    console.log(Store.viewLogger.sourceBidsLogView);
    return Store.viewLogger.sourceBidsLogView.map((value, index) => {
        return (
            <SourceChart
                key={uuid()}
                yOffset={topYOffset + index * everyItemYOffset}
                currentSource={value}
            />
        );
    });
});

export default SourcesLog;
