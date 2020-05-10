import React from 'react';

import './Effect.css';
import Icon36Done from '@vkontakte/icons/dist/36/done';
import Icon36Cancel from '@vkontakte/icons/dist/36/cancel';

const Effect = ({type}) => {

    return (
        <div className="effect" style={{background: type?'#4bb34b':'#ff3347'}}>
            {type ?
                <Icon36Done className="icon" width={50} height={50}/>
                :
                <Icon36Cancel className="icon" width={50} height={50}/>
            }
        </div>
    );
}

export default Effect;