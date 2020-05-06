import React from 'react';

const buildControl = (props) => {
    return (
        <div>
            <div>
                {props.children}
            </div>
            <button>+</button>
            <button>-</button>
        </div>
    )
}

export default buildControl;
