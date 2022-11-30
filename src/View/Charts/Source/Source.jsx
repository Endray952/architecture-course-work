import { observer } from 'mobx-react-lite';
import React from 'react';
import { Line, Text } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';

const SourceChart = observer(({ yOffset, currentSource }) => {
    if (!currentSource) return null;
    const text = `Source Id: ${
        currentSource.sourceId
    } ${Store.systemTime.toFixed(3)}`;
    return (
        <>
            <Line
                key={uuid()}
                points={[0, yOffset, Store.systemTime * 100, yOffset]}
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
                text={text}
                x={0}
                y={yOffset - 15}
            />
        </>
    );
});

export default SourceChart;
