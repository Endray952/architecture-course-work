import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import styled from 'styled-components';
import Store from '../../Logic/Store';
const ColumnPair = styled.div`
    display: flex;
    flex-direction: column;
`;
const MODE = { step: 'step', auto: 'auto' };
const RadioButtons = observer(() => {
    //const [selectedMode, setSelectedMode] = useState(MODE.step);
    const setMode = (e) => {
        //setSelectedMode(e.target.value);
        //Store.initialParametrs.mode = selectedMode;
        //console.log(selectedMode, Store.initialParametrs);
        Store.initialParametrs.mode = e.target.value;
        console.log(Store.initialParametrs);
    };
    return (
        <ColumnPair>
            <div>
                <input
                    type='radio'
                    id='auto'
                    name='mode'
                    value='auto'
                    onChange={setMode}
                    checked={Store.initialParametrs.mode === MODE.auto}
                />{' '}
                Автоматический режим
            </div>
            <div>
                <input
                    onChange={setMode}
                    type='radio'
                    id='step'
                    name='mode'
                    value='step'
                    checked={Store.initialParametrs.mode === MODE.step}
                />{' '}
                Пошаговый режим
            </div>
        </ColumnPair>
    );
});

export default RadioButtons;
