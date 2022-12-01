import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';
import { Line, Text } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import ChartText from '../../ChartText';
import SourceBids from './SourceBids';

const SourceChart = observer(({ yOffset, currentSource }) => {
    // console.log(JSON.stringify(currentSource));
    if (!currentSource) return null;
    const text = `И${currentSource.sourceId}`;
    const textRef = useRef();

    return (
        <>
            <SourceBids currentSource={currentSource} yOffset={yOffset} />
            <Line
                key={uuid()}
                // points={[0, yOffset, Store.systemTime * 100, yOffset]}
                points={[0, yOffset, Store.timeLineLength, yOffset]}
                stroke={'#000000'}
                strokeWidth={2}
            />
            {/* <Text
                ref={textRef}
                text={text}
                x={0 - Store.stageDrag.x}
                y={yOffset - 30}
            /> */}
            <ChartText text={text} yOffset={yOffset - 30} />
        </>
    );
});

export default SourceChart;
