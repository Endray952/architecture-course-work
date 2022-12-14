import { observer } from 'mobx-react-lite';
import React from 'react';
import { Line, Text } from 'react-konva';

import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import ChartText from '../../ChartText';
import DenyMarks from './DenyMarks';

const DenyLog = observer(({ yOffset }) => {
    // console.log(Store.viewLogger.deviceLogView.length);

    return (
        <>
            <DenyMarks yOffset={yOffset} />
            <Line
                key={uuid()}
                points={[0, yOffset, Store.timeLineLength, yOffset]}
                stroke={'rgba(132, 0, 0, 1)'}
                strokeWidth={2}
            />
            {/* <Text text={'ОТК'} x={0 - Store.stageDrag.x} y={yOffset - 30} /> */}
            <ChartText text={'ОТК'} yOffset={yOffset - 30} />
        </>
    );
});

export default DenyLog;
