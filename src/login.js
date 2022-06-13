import React, { useState, useContext, useEffect } from 'react';
import { UserContext, Card } from './context';

export function Login(){
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [isLoginEnabled, setIsLoginEnabled] = useState( false );

    const ctx = useContext(UserContext);
    useEffect( () => {
        setShow( !ctx.currentUser );
    }, [ ctx.currentUser ] );

    function validate(field, label){
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
        return true;
    }

    async function handleLogin(){
        console.log(email,password);
        if (!validate(email,    'email'))    return;
        if (!validate(password, 'password')) return;

        await fetch( `/account/login/${ encodeURIComponent( email ) }/${ encodeURI( password ) }` )
            .then( response => {
                if ( !response.ok ) {
                    response.text()
                        .then( text => {
                            setStatus('Error: ' + text);
                            setTimeout(() => setStatus(''),3000);
                        } );
                    return;
                }
                response.json()
                    .then( json => {
                        ctx.setCurrentUser( json );
                        setShow(false);
                    } );
            } );
    }

    return (
        <Card
            bgcolor="primary"
            header="Login"
            status={status}
            body={show ? (  
                <form onSubmit={pEvent => pEvent.preventDefault()} autoComplete="off">
                    Email address<br/>
                    <input type="text" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => { setEmail(e.currentTarget.value); setIsLoginEnabled( !!e.currentTarget.value && !!password ); } }/><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => { setPassword(e.currentTarget.value); setIsLoginEnabled( !!email && !!e.currentTarget.value ); } }/><br/>
                    <button type="submit" disabled={ isLoginEnabled ? null : 'disabled' } className="btn btn-light" onClick={handleLogin}>Sign in</button>
                </form>
            ):(
                <>
                    <h5>Success</h5>
                </>
            )}
        />
    );
}
