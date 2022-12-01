import { observer } from 'mobx-react-lite';
import React from 'react';
import Store from '../../Logic/Store';
import { Table } from './Table';

const sourcesColumns = [
    'Номер источника',
    'Количество заявок',
    'Pотк',
    'Tпреб',
    'TБП',
    'Tобсл',
    'ДБП',
    'Добсл',
];

const devicesColumns = ['Номер прибора', 'Коэффициент использования'];

const AutoRegime = observer(() => {
    if (Store.initialParametrs.mode !== 'auto') {
        return null;
    }
    const rows = Store.logger.sourceLog.map((logInfo) => {
        //console.log(logInfo);
        let Tdevice = 0;
        let TDeviceSquare = 0;
        const nDevice = logInfo.value.startTimeInDevice.length;
        logInfo.value.startTimeInDevice.forEach((startTime, index) => {
            Tdevice += logInfo.value.endTimeInDevice[index] - startTime;
            TDeviceSquare +=
                (logInfo.value.endTimeInDevice[index] - startTime) ** 2;
        });
        let Tbuffer = 0;
        let TBufSquare = 0;
        const nBuf = logInfo.value.startTimeInBuffer.length;
        logInfo.value.startTimeInBuffer.forEach((startTime, index) => {
            Tbuffer += logInfo.value.endTimeInBuffer[index] - startTime;
            TBufSquare +=
                (logInfo.value.endTimeInBuffer[index] - startTime) ** 2;
        });
        return [
            logInfo.sourceId,
            logInfo.value.numProduced,
            (logInfo.value.numRefused / logInfo.value.numProduced).toFixed(3),
            Tbuffer && Tdevice
                ? (Tbuffer / nBuf + Tdevice / nDevice).toFixed(2)
                : 0,
            Tbuffer ? (Tbuffer / nBuf || 0).toFixed(2) : 0,
            Tdevice ? (Tdevice / nDevice).toFixed(2) : 0,
            (TBufSquare / nBuf - (Tbuffer / nBuf) ** 2 || 0).toFixed(2),
            (TDeviceSquare / nDevice - (Tdevice / nDevice) ** 2 || 0).toFixed(
                2
            ),
        ];
    });
    return <Table columns={sourcesColumns} rows={rows} cellWidth={150} />;
});

export default AutoRegime;
