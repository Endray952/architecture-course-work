import { observer } from 'mobx-react-lite';
import React from 'react';
import { Line, Text } from 'react-konva';

import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import DenyMarks from './DenyMarks';

const DenyLog = observer(({ yOffset }) => {
    // console.log(Store.viewLogger.deviceLogView.length);

    return (
        <>
            <DenyMarks yOffset={yOffset} />
            <Line
                key={uuid()}
                // points={[0, yOffset, Store.systemTime * 100, yOffset]}
                points={[0, yOffset, 2000, yOffset]}
                stroke={'rgba(132, 0, 0, 1)'}
                strokeWidth={5}
            />
            <Text
                // width={textWidth}
                // height={textHeight}
                // ref={textRef}
                // fontSize={RULER_FONT_SIZE}
                // align={'center'}
                // verticalAlign={'middle'}
                text={'Denied'}
                x={0}
                y={yOffset - 30}
            />
        </>
    );
});

export default DenyLog;