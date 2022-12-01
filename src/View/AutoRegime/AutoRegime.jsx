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
    const rows = Store.logger.sourceLog;
    return <Table columns={sourcesColumns} />;
});

export default AutoRegime;
