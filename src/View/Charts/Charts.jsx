import { observer } from 'mobx-react-lite';
import React from 'react';
import { Layer, Line, Stage } from 'react-konva';
import styled from 'styled-components';
import Store from '../../Logic/Store';
import { v4 as uuid } from 'uuid';

import SourcesLog from './Source/SourcesLog';
import DevicesLog from './Device/DevicesLog';
import BuffersLog from './Buffer/BuffersLog';
import DenyLog from './Deny/DenyLog';
import { action } from 'mobx';

const ChartContainer = styled.div`
    width: fit-content;
    height: fit-content;
    border: 5px solid black;
`;

const Charts = observer(() => {
    const topYOffsetSource = 50;
    const everyItemYOffset = 50;
    const topYOffsetDevices =
        Store.viewLogger.sourceBidsLogView.length * everyItemYOffset +
        topYOffsetSource;
    const topYOffsetBuffers =
        Store.viewLogger.sourceBidsLogView.length * everyItemYOffset +
        Store.viewLogger.deviceLogView.length * everyItemYOffset +
        topYOffsetSource;
    const topYOffsetDeny =
        Store.viewLogger.sourceBidsLogView.length * everyItemYOffset +
        Store.viewLogger.deviceLogView.length * everyItemYOffset +
        Store.viewLogger.bufferViewLog.length * everyItemYOffset +
        topYOffsetSource;
    return (
        <ChartContainer>
            <Stage
                onDragEnd={action((e) => {
                    Store.stageDrag = {
                        x: e.target.attrs.x,
                        y: e.target.attrs.y,
                    };
                    //console.log(Store.stageDrag);
                })}
                width={window.innerWidth - 30}
                height={800}
                draggable
            >
                <Layer>
                    <SourcesLog
                        topYOffset={topYOffsetSource}
                        everyItemYOffset={everyItemYOffset}
                    />
                    <DevicesLog
                        topYOffset={topYOffsetDevices}
                        everyItemYOffset={everyItemYOffset}
                    />
                    <BuffersLog
                        topYOffset={topYOffsetBuffers}
                        everyItemYOffset={everyItemYOffset}
                    />
                    <DenyLog yOffset={topYOffsetDeny} />
                    <Line
                        x={0}
                        y={0}
                        key={uuid()}
                        points={[
                            Store.systemTime * 100,
                            0,
                            Store.systemTime * 100,
                            topYOffsetDeny,
                        ]}
                        stroke={'rgba(0, 0, 0, 0.5)'}
                        strokeWidth={2}
                    />
                    <Line
                        x={0}
                        y={0}
                        key={uuid()}
                        points={[
                            Store.calendar[Store.calendar.length - 1]?.time *
                                100,
                            0,
                            Store.calendar[Store.calendar.length - 1]?.time *
                                100,
                            topYOffsetDeny + 10,
                        ]}
                        stroke={'rgba(107, 218, 63, 0.7)'}
                        dash={[25, 10]}
                        strokeWidth={2}
                    />
                    {/* <Rect width={100} height={100} x={100} y={100} fill={'black'}/> */}
                </Layer>
            </Stage>
        </ChartContainer>
    );
});

export default Charts;
