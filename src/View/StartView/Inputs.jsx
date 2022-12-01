import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const StartOptionsContainer = styled.div`
    display: flex;
`;

const ColumnPair = styled.div`
    display: flex;
    flex-direction: column;
`;

const Inputs = () => {
    return (
        <StartOptionsContainer>
            <ColumnPair>
                <input
                    placeholder='Количество источников'
                    type='number'
                    onChange={(e) => console.log(e.target.value)}
                ></input>
                <input></input>
            </ColumnPair>
            <ColumnPair>
                <input></input>
                <input></input>
            </ColumnPair>
            <ColumnPair>
                <input></input>
                <input></input>
            </ColumnPair>
        </StartOptionsContainer>
    );
};

export default Inputs;
