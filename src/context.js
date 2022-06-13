/* eslint-disable react/prop-types */
import React from 'react';

import { createContext } from 'react';

export const UserContext = createContext( null );

export function Card(props){
    function classes(){
        const bg  = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
        const txt = props.txtcolor ? ' text-' + props.txtcolor: ' text-white';
        return 'card mb-3 ' + bg + txt;
    }

    return (
        <div className={classes()} style={{maxWidth: props.fullWidth ? null : '18rem'}}>
            { props.header ? (
                <div className="card-header">{props.header}</div>
            ) : null }
            <div className="card-body">
                {props.title && (<h5 className="card-title">{props.title}</h5>)}
                {props.text && (<p className="card-text">{props.text}</p>)}
                {props.body}
                {props.status && (<div id='createStatus'>{props.status}</div>)}
            </div>
        </div>
    );
}