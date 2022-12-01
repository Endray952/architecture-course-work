import { observer } from 'mobx-react-lite';
import React from 'react';
import { Line, Text } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import BufferStoresRect from './BufferStoresRect';

const BufferChart = observer(({ yOffset, currentBuffer }) => {
    //console.log(JSON.stringify(currentDevice));
    if (!currentBuffer) return null;
    const text = `Buffer Id: ${currentBuffer.bufferId}`;
    return (
        <>
            <BufferStoresRect currentBuffer={currentBuffer} yOffset={yOffset} />
            <Line
                key={uuid()}
                // points={[0, yOffset, Store.systemTime * 100, yOffset]}
                points={[0, yOffset, Store.timeLineLength, yOffset]}
                stroke={'rgba(132, 0, 0, 1)'}
                strokeWidth={5}
            />
            <Text key={uuid()} text={text} x={0} y={yOffset - 30} />
        </>
    );
});

export default BufferChart;
