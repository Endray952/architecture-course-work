import { observer } from 'mobx-react-lite';
import React from 'react';
import { Rect, Text } from 'react-konva';
import { v4 as uuid } from 'uuid';

const DeviceProduceRect = observer(({ currentDevice, yOffset }) => {
    //console.log(JSON.stringify(currentSource.value));
    console.log(yOffset);
    return currentDevice.value.map((logInfo) => {
        return (
            <>
                <Text
                    text={`${logInfo.sourceId}.${logInfo.bidNum}`}
                    x={logInfo.startTime * 100 + 10}
                    y={yOffset - 15}
                />
                <Rect
                    x={logInfo.startTime * 100}
                    y={yOffset - 20}
                    width={(logInfo.endTime - logInfo.startTime) * 100}
                    height={20}
                    key={uuid()}
                    fill='#29d11333'
                    stroke={'black'}
                    strokeWidth={2}
                    // x={100}
                    // y={400}
                    // width={100}
                    // height={15}
                    // key={uuid()}
                    // fill='blue'
                />
            </>
        );
    });
});

export default DeviceProduceRect;
