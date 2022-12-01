import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text } from 'react-konva';
import { v4 as uuid } from 'uuid';
import Store from '../Logic/Store';
const ChartText = observer(({ text, yOffset }) => {
    return (
        <Text key={uuid()} text={text} x={20 - Store.stageDrag.x} y={yOffset} />
    );
});

export default ChartText;
