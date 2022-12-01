import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Store from './Logic/Store';
import { System } from './Logic/System';
import BufferedBids from './View/BufferedBids';
import Calendar from './View/Calendar';
import Charts from './View/Charts/Charts';
import StepMode from './View/Charts/StepMode';
import Devices from './View/Devices';
import FreeBuffers from './View/FreeBuffers';
import Logger from './View/Logger/Logger';

import Sources from './View/Sources';
import StartOptions from './View/StartView/StartOptions';

//const system = new System(null, 10, 5, 3, 5);

const LogContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const App = observer(() => {
    let systemRef = useRef();
    // useEffect(() => {
    //     systemRef.current = new System(10, 5, 3, 3);
    //     Store.update(systemRef.current);
    //     //systemRef.current.calendar.getAllEvents();
    // }, []);
    const [start, setStart] = useState(0);

    useEffect(() => {
        if (Store.initialParametrs.started) {
            console.log(Store.initialParametrs);
            systemRef.current = new System(
                Store.initialParametrs.bidsNum,
                Store.initialParametrs.sourcesNum,
                Store.initialParametrs.devicesNum,
                Store.initialParametrs.buffersNum
            );
            Store.update(systemRef.current);
        }
        console.log('useEffect');
        //systemRef.current.calendar.getAllEvents();
    }, [start]);

    return (
        <>
            <StartOptions setStart={setStart} start={start} />
            <StepMode systemRef={systemRef} />

            {/* <LogContainer>
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
            </LogContainer> */}
        </>
    );
});

export default App;
