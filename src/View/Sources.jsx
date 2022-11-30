import { observer } from 'mobx-react-lite';
import React from 'react';
import { v4 as uuid } from 'uuid';
import Store from '../Logic/Store';

const Sources = observer(() => {
    return (
        <>
            <div> Sources</div>
            {Store.sources.map((item) => {
                return <div key={uuid()}>{item.getSourceParamtrs()}</div>;
            })}
            <div key={uuid()}>
                {' current event: ' + JSON.stringify(Store.currentEvent)}
            </div>
        </>
    );
});

export default Sources;
