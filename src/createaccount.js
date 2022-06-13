import React, { useState, useContext } from 'react';
import { UserContext, Card } from './context';

export function CreateAccount(){
    const [show, setShow]         = useState(true);
    const [status, setStatus]     = useState('');
    const [name, setName]         = useState('');
    const [email, setEmail]       = useState('');
    const [password, setPassword] = useState('');
    const [isCreateAccountEnabled, setIsCreateAccountEnabled] = useState( false );

    const ctx = useContext(UserContext);  

    function validate(field, label){
        if (!field) {
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''),3000);
            return false;
        }
        return true;
    }

    function handleCreate(){
        console.log(name,email,password);
        if (!validate(name,     'name'))     return;
        if (!validate(email,    'email'))    return;
        if (!validate(password, 'password')) return;
        ctx.users.push({name,email,password,balance:100});
        setShow(false);
    }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
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
                    <button type="submit" className="btn btn-light" onClick={clearForm}>Add another account</button>
                </>
            )}
        />
    );
}