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

    const currentEvent =
        Store?.currentEvent &&
        (Store.currentEvent.type === 'new_bid'
            ? `новая заявка И${Store.currentEvent.id}.${Store.currentEvent.bidNum}`
            : `завершение обслуживания П${Store.currentEvent.deviceId} И${Store.currentEvent.sourceId}.${Store.currentEvent.bidNum}`);

    const nextEventLog =
        Store?.calendar && Store?.calendar[Store?.calendar?.length - 1];
    const nextEvent =
        nextEventLog &&
        (nextEventLog.type === 'new_bid'
            ? `новая заявка И${nextEventLog.id}.${nextEventLog.bidNum}`
            : `завершение обслуживания П${nextEventLog.deviceId} И${nextEventLog.sourceId}.${nextEventLog.bidNum}`);
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
            }, Заявок отклонено: ${
                Store.bidsRefused
            }, Текущее особое событие: ${
                currentEvent || ''
            }, Следующее особое событие: ${
                nextEvent || 'Завершение моделирования'
            }`}</div>
            <Charts />
        </>
    );
});

export default StepMode;
