import React from 'react';
import Store from '../../Logic/Store';
import Charts from './Charts';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

const StepMode = observer(({ systemRef }) => {
    if (
        !Store.initialParametrs.started ||
        Store.initialParametrs.mode !== 'step'
    ) {
        return null;
    }
    return (
        <>
            <button
                onClick={() => {
                    systemRef.current?.handleNextEvent();
                    Store.update(systemRef.current);
                }}
                disabled={Store.endModulating}
            >
                next step
            </button>
            <div key={uuid()}>{`Текущее время:  ${Store.systemTime.toFixed(
                3
            )},  Заявок обработано:  ${
                Store.bidsProduced
            }, Заявок сгенерировано: ${Store.bidsGenerated}`}</div>
            <Charts />
        </>
    );
});

export default StepMode;
