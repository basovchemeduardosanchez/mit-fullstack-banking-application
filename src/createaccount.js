import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext, Card } from './context';

export function CreateAccount(){
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [isCreateAccountEnabled, setIsCreateAccountEnabled] = useState( false );

    const history = useHistory();
    const ctx = useContext(UserContext);

    function validate(field, label){
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
        return true;
    }

    async function handleCreate(){
        console.log(name,email,password);
        if (!validate(name,     'name'))     return;
        if (!validate(email,    'email'))    return;
        if (!validate(password, 'password')) return;
        //ctx.users.push({name,email,password,balance:100});

        await fetch( `/account/create/${ encodeURIComponent( name ) }/${ encodeURIComponent( email ) }/${ encodeURI( password ) }` )
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
                        setShow(false);
                        ctx.setCurrentUser( json );
                        history.push( '/login/' );
                    } );
            } );
    }

    return (
        <Card
            bgcolor="primary"
            header="Create Account"
            status={status}
            body={show ? (  
                <form onSubmit={pEvent => pEvent.preventDefault()} autoComplete="off">
                    Name<br/>
                    <input type="text" className="form-control" id="name" placeholder="Enter name" value={name} onChange={e => { setName(e.currentTarget.value); setIsCreateAccountEnabled( !!e.currentTarget.value || !!email || !!password ); } } /><br/>
                    Email address<br/>
                    <input type="text" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => { setEmail(e.currentTarget.value); setIsCreateAccountEnabled( !!name || !!e.currentTarget.value || !!password ); } }/><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => { setPassword(e.currentTarget.value); setIsCreateAccountEnabled( !!name || !!email || !!e.currentTarget.value ); } }/><br/>
                    <button type="submit" disabled={ isCreateAccountEnabled ? null : 'disabled' } className="btn btn-light" onClick={handleCreate}>Create Account</button>
                </form>
            ):(
                <>
                    <h5>Success</h5>
                </>
            )}
        />
    );
}