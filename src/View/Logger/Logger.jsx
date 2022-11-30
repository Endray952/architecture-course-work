import { observer } from 'mobx-react-lite';
import React from 'react';
import Store from '../../Logic/Store';
import DenyLog from './DenyLog';
import DeviceLog from './DeviceLog';
import SourceLog from './SourceLog';
import BufferViewLog from './ViewLog/BufferViewLog';
import DenyViewLog from './ViewLog/DenyViewLog';
import DeviceViewLog from './ViewLog/DeviceViewLog';
import SourceBidsViewLog from './ViewLog/SourceBidsViewLog';

const Logger = observer(() => {
    return (
        <>
            <DeviceLog deviceLog={Store.logger.deviceLog} />
            <SourceLog sourceLog={Store.logger.sourceLog} />
            <DenyLog denyLog={Store.denyView} />
            <SourceBidsViewLog />
            <DeviceViewLog />
            <BufferViewLog />
            <DenyViewLog />
        </>
    );
});

export default Logger;
