import { observer } from 'mobx-react-lite';
import React from 'react';
import { Line, Text } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';
import ChartText from '../../ChartText';
import DeviceProduceRect from './DeviceProduceRect';

const DeviceChart = observer(({ yOffset, currentDevice }) => {
    //console.log(JSON.stringify(currentDevice));
    if (!currentDevice) return null;
    const text = `П${currentDevice.deviceId}`;
    return (
        <>
            <DeviceProduceRect
                currentDevice={currentDevice}
                yOffset={yOffset}
            />
            <Line
                key={uuid()}
                // points={[0, yOffset, Store.systemTime * 100, yOffset]}
                points={[0, yOffset, Store.timeLineLength, yOffset]}
                stroke={'rgba(132, 0, 0, 1)'}
                strokeWidth={5}
            />
            {/* <Text
                
                text={text}
                x={0 - Store.stageDrag.x}
                y={yOffset - 30}
            /> */}
            <ChartText text={text} yOffset={yOffset - 30} />
        </>
    );
});

export default DeviceChart;
