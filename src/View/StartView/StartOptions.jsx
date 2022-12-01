import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Inputs from './Inputs';
import RadioButtons from './RadioButtons';

const StartOptionsContainer = styled.div`
    display: flex;
`;

const ColumnPair = styled.div`
    display: flex;
    flex-direction: column;
`;

const StartOptions = () => {
    return (
        <StartOptionsContainer>
            <Inputs />
            <RadioButtons />
        </StartOptionsContainer>
    );
};

export default StartOptions;
