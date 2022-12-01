import { observer } from 'mobx-react-lite';
import React from 'react';
import { Line, Text } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import ChartText from '../../ChartText';
import BufferStoresRect from './BufferStoresRect';

const BufferChart = observer(({ yOffset, currentBuffer }) => {
    //console.log(JSON.stringify(currentDevice));
    if (!currentBuffer) return null;
    const text = `Б${currentBuffer.bufferId}`;
    return (
        <>
            <BufferStoresRect currentBuffer={currentBuffer} yOffset={yOffset} />
            <Line
                key={uuid()}
                // points={[0, yOffset, Store.systemTime * 100, yOffset]}
                points={[0, yOffset, Store.timeLineLength, yOffset]}
                stroke={'#281c6e'}
                strokeWidth={2}
            />
            {/* <Text
                key={uuid()}
                text={text}
                x={0 - Store.stageDrag.x}
                y={yOffset - 30}
            /> */}
            <ChartText text={text} yOffset={yOffset - 30} />
        </>
    );
});

export default BufferChart;
