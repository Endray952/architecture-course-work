import { observer } from 'mobx-react-lite';
import React from 'react';
import { Rect, Text } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Store from '../../../Logic/Store';

const DenyMarks = observer(({ yOffset }) => {
    //console.log(JSON.stringify(currentSource.value));
    return Store.viewLogger.denyViewLog.map((logInfo) => {
        return (
            <>
                <Text
                    text={`${logInfo.sourceId}.${logInfo.bidNum}`}
                    x={logInfo.time * 100 - 10}
                    y={yOffset - 25}
                />
                <Rect
                    x={logInfo.time * 100 - 2.5}
                    y={yOffset - 15}
                    width={5}
                    height={15}
                    key={uuid()}
                    fill='blue'
                    draggable
                />
            </>
        );
    });
});

export default DenyMarks;
