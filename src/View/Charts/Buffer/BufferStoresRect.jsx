import { observer } from 'mobx-react-lite';
import React from 'react';
import { Rect, Text } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';

const BufferStoresRect = observer(({ currentBuffer, yOffset }) => {
    // console.log(JSON.stringify(currentBuffer.value));
    //console.log(yOffset);
    return currentBuffer.value.map((logInfo) => {
        //console.log(JSON.stringify(currentBuffer.value));
        const width = logInfo.endTime
            ? (logInfo.endTime - logInfo.startTime) * 100
            : (Store.systemTime - logInfo.startTime) * 100;
        return (
            <>
                <Text
                    key={uuid()}
                    text={`${logInfo.sourceId}.${logInfo.bidNum}`}
                    x={logInfo.startTime * 100 + 10}
                    y={yOffset - 15}
                />
                <Rect
                    x={logInfo.startTime * 100}
                    y={yOffset - 20}
                    width={width}
                    height={20}
                    key={uuid()}
                    fill='#29d11333'
                    stroke={'black'}
                    strokeWidth={2}
                />
            </>
        );
    });
});

export default BufferStoresRect;
