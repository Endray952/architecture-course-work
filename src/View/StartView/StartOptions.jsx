import { observer } from 'mobx-react-lite';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Store from '../../Logic/Store';
import Inputs from './Inputs';
import RadioButtons from './RadioButtons';

const StartOptionsContainer = styled.div`
    display: flex;
`;

const ColumnPair = styled.div`
    display: flex;
    flex-direction: column;
`;

const StartOptions = observer(({ start, setStart }) => {
    const [errorText, setErrorText] = useState('');
    const handleStart = () => {
        const validateText = validateData();
        // console.log(validateText);
        if (validateText === 'valid') {
            setErrorText('');
            Store.initialParametrs.started = true;
            setStart(++start);
        } else {
            setErrorText(validateText);
        }
    };
    return (
        <>
            <StartOptionsContainer>
                <Inputs />
                <RadioButtons />
                <button onClick={handleStart}>Начать</button>
            </StartOptionsContainer>
            {errorText && <p>{errorText}</p>}
        </>
    );
});

export default StartOptions;

const validateData = () => {
    const params = Store.initialParametrs;
    if (params.produceTimeInterval.start >= params.produceTimeInterval.end) {
        return 'invalid produce interval';
    }
    if (
        params.sourcesNum <= 0 ||
        params.buffersNum <= 0 ||
        params.devicesNum <= 0 ||
        params.bidsNum < params.sourcesNum ||
        params.lambda <= 0 ||
        params.produceTimeInterval.start <= 0 ||
        params.produceTimeInterval.end <= 0
    ) {
        return 'input value';
    }

    return 'valid';
};
