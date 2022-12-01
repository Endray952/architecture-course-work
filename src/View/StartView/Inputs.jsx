import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import Store from '../../Logic/Store';

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
                    onChange={(e) => {
                        Store.initialParametrs.sourcesNum = +e.target.value;
                    }}
                />
                <input
                    placeholder='Количество приборов'
                    type='number'
                    onChange={(e) => {
                        Store.initialParametrs.devicesNum = +e.target.value;
                    }}
                />
            </ColumnPair>
            <ColumnPair>
                <input
                    placeholder='Количество буферов'
                    type='number'
                    onChange={(e) => {
                        Store.initialParametrs.buffersNum = +e.target.value;
                    }}
                />
                <input
                    placeholder='Количество заявок'
                    type='number'
                    onChange={(e) => {
                        Store.initialParametrs.bidsNum = +e.target.value;
                    }}
                />
            </ColumnPair>
            <ColumnPair>
                <input
                    placeholder='Параметр лямюда'
                    type='number'
                    onChange={(e) => {
                        Store.initialParametrs.lambda = +e.target.value;
                    }}
                />
                <div>
                    <input
                        placeholder='время обработки прибора до'
                        type='number'
                        onChange={(e) => {
                            Store.initialParametrs.produceTimeInterval.start =
                                +e.target.value;
                        }}
                    />
                    <input
                        placeholder='от'
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
