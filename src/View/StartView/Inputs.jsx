import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Store from '../../Logic/Store';

const StartOptionsContainer = styled.div`
    display: flex;
`;

const ColumnPair = styled.div`
    display: flex;
    flex-direction: column;
    * {
        width: 300px;
    }
`;

const Inputs = () => {
    return (
        <StartOptionsContainer>
            <ColumnPair>
                <input
                    placeholder='Количество источников: 5'
                    type='number'
                    onChange={(e) => {
                        Store.initialParametrs.sourcesNum = +e.target.value;
                    }}
                />
                <input
                    placeholder='Количество приборов: 5'
                    type='number'
                    onChange={(e) => {
                        Store.initialParametrs.devicesNum = +e.target.value;
                    }}
                />
            </ColumnPair>
            <ColumnPair>
                <input
                    placeholder='Количество буферов: 5'
                    type='number'
                    onChange={(e) => {
                        Store.initialParametrs.buffersNum = +e.target.value;
                    }}
                />
                <input
                    placeholder='Количество заявок: 10'
                    type='number'
                    onChange={(e) => {
                        Store.initialParametrs.bidsNum = +e.target.value;
                    }}
                />
            </ColumnPair>
            <ColumnPair>
                <input
                    placeholder='Параметр лямбда: 0.25'
                    type='number'
                    onChange={(e) => {
                        Store.initialParametrs.lambda = +e.target.value;
                    }}
                />
                <div>
                    <input
                        placeholder='время обр П от: 3'
                        type='number'
                        onChange={(e) => {
                            Store.initialParametrs.produceTimeInterval.start =
                                +e.target.value;
                        }}
                    />
                    <input
                        placeholder='до: 5'
                        type='number'
                        onChange={(e) => {
                            Store.initialParametrs.produceTimeInterval.end =
                                +e.target.value;
                        }}
                    />
                </div>
            </ColumnPair>
        </StartOptionsContainer>
    );
};

export default Inputs;
