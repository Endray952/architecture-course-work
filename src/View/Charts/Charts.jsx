import { observer } from 'mobx-react-lite';
import React from 'react';
import { Circle, Layer, Rect, Stage } from 'react-konva';
import styled from 'styled-components';

import SourcesLog from './Source/SourcesLog';

const ChartContainer = styled.div`
    width: fit-content;
    height: fit-content;
    border: 5px solid black;
`;

const Charts = observer(() => {
    return (
        <ChartContainer>
            <Stage width={window.innerWidth - 30} height={800} draggable>
                <Layer>
                    {/* <Rect
                        x={100}
                        y={20}
                        width={100}
                        height={100}
                        key={11234}
                        fill='#89b717'
                        draggable
                    /> */}
                    <SourcesLog />
                </Layer>
            </Stage>
        </ChartContainer>
    );
});

export default Charts;
