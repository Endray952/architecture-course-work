import React from 'react';
import Store from '../../Logic/Store';
import Charts from './Charts';
import { v4 as uuid } from 'uuid';

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
                    //console.log(JSON.stringify(Store.logger.sourceLog));
                }}
                disabled={Store.endModulating}
            >
                next step
            </button>
            <div key={uuid()}>{`Текущее время:  ${Store.systemTime.toFixed(
                3
            )},  Заявок обработано:  ${
                Store.bidsProduced
            }, Заявок сгенерировано: ${
                Store.bidsGenerated
            }, Заявок отклонено: ${Store.bidsRefused}`}</div>
            <Charts />
        </>
    );
});

export default StepMode;
