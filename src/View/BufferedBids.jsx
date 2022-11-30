import React from 'react';
import Store from '../Logic/Store';
import { v4 as uuid } from 'uuid';
import { observer } from 'mobx-react-lite';

const BufferedBids = observer(() => {
    return (
        <>
            <div> BufferedBids</div>
            {Store.bufferedBids.map((item) => {
                return <div key={uuid()}>{JSON.stringify(item)}</div>;
            })}
        </>
    );
});

export default BufferedBids;
