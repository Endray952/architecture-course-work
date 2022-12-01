import React, { useState } from 'react';
import styled from 'styled-components';
const ColumnPair = styled.div`
    display: flex;
    flex-direction: column;
`;
const MODE = { step: 'step', auto: 'auto' };
const RadioButtons = () => {
    const [selectedMode, setSelectedMode] = useState(MODE.step);
    const setMode = (e) => {
        setSelectedMode(e.target.value);
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
                    checked={selectedMode === MODE.auto}
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
                    checked={selectedMode === MODE.step}
                />{' '}
                Пошаговый режим
            </div>
        </ColumnPair>
    );
};

export default RadioButtons;
