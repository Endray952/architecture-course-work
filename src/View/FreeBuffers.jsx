import React from 'react';
import Store from '../Logic/Store';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';

const FreeBuffers = observer(() => {
    return (
        <>
            <div>
                {'FreeBuffers. Current index: ' + Store.freeBuffers.index}
            </div>
            {Store.freeBuffers.buffers.map((item) => {
                return <div key={uuid()}>{JSON.stringify(item)}</div>;
            })}
        </>
    );
});

export default FreeBuffers;
