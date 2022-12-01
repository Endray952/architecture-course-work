import { observer } from 'mobx-react-lite';
import React from 'react';
import styled from 'styled-components';
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
`;

const StyledP = styled.p`
    font-size: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`;

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
`;

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

    const devicesRows = Store.logger.deviceLog.map((logInfo) => {
        return [
            logInfo.deviceId,
            (logInfo.usedTime / Store.systemTime || 0).toFixed(3),
        ];
    });
    devicesRows.sort((item_1, item_2) => item_1[0] - item_2[0]);
    return (
        <Container>
            <StyledP>Характеристики источников ВС</StyledP>
            <Table columns={sourcesColumns} rows={rows} cellWidth={150} />
            <TableContainer>
                <StyledP>Характеристики приборов ВС</StyledP>
                <Table
                    columns={devicesColumns}
                    rows={devicesRows}
                    cellWidth={150}
                />
            </TableContainer>
        </Container>
    );
});

export default AutoRegime;
