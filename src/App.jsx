import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Store from './Logic/Store';
import { System } from './Logic/System';
import BufferedBids from './View/BufferedBids';
import Calendar from './View/Calendar';
import Charts from './View/Charts/Charts';
import Devices from './View/Devices';
import FreeBuffers from './View/FreeBuffers';
import Logger from './View/Logger/Logger';

import Sources from './View/Sources';

//const system = new System(null, 10, 5, 3, 5);

const LogContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const App = observer(() => {
    let systemRef = useRef();
    useEffect(() => {
        systemRef.current = new System(null, 5, 5, 3, 3);
        Store.update(systemRef.current);
        //systemRef.current.calendar.getAllEvents();
    }, []);

    return (
        <>
            <div>
                current time {Store.systemTime} bidsProduced{' '}
                {Store.bidsProduced}
            </div>

            <button
                onClick={() => {
                    systemRef.current?.handleNextEvent();
                    Store.update(systemRef.current);
                }}
            >
                next step
            </button>
            <div>{`current time:  ${Store.systemTime.toFixed(3)}`}</div>
            <Charts />
            <LogContainer>
                <div>
                    <Calendar />
                    <Sources />
                    <Devices />
                    <BufferedBids />
                    <FreeBuffers />
                </div>
                <div>
                    <Logger />
                </div>
            </LogContainer>
        </>
    );
});

export default App;
