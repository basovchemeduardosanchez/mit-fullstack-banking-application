import React, { useContext, useState } from 'react';
import { UserContext, Card } from './context';

export function Deposit(){
    const context = useContext(UserContext);
    const [ status, setStatus ] = useState( '' );
    const [ isDepositing, setIsDepositing ] = useState( false );
    const [ amount, setAmount ] = useState( '' );
    const [ isDepositEnabled, setIsDepositEnabled ] = useState( false );

    function isAmountValid( pAmount = amount ){
        return !!pAmount && !isNaN(pAmount) && pAmount > 0;
    }

    function handleDeposit(){
        if ( !context.currentUser ) return;

        setStatus( '' );
        if ( !isAmountValid() ) {
            setStatus( 'Error: The amount is invalid' );
            setTimeout(() => setStatus(''),3000);
            return;
        }

        fetch( `/account/update/${ encodeURIComponent( context.currentUser.email ) }/${ encodeURIComponent( parseFloat( amount ) ) }` )
            .then( response => {
                if ( !response.ok ) {
                    response.text()
                        .then( text => {
                            setStatus( 'Error: ' + text );
                            setTimeout(() => setStatus(''),3000);
                        } );
                    return;
                }
                response.json()
                    .then( json => {
                        setAmount( '' );
                        setIsDepositing( true );
                        context.setCurrentUser( json.value );
                    } );
            } );
    }
    function handleAmountChange( pEvent ){
        const newAmount = pEvent.currentTarget.value;
        setAmount( newAmount );
        setIsDepositEnabled( newAmount !== '' );
    }

    return (
        <>
            <h1>Deposit</h1>
            <Card
                txtcolor="black"
                status={ status }
                body={ isDepositing ? (
                    <>
                        Success!<br/><br/>
                        New balance: <span style={ { fontWeight: 'bold' } }>{context.currentUser.balance}</span><br/><br/>
                        <button className='btn btn-primary' type='button' onClick={() => setIsDepositing( false )}>Deposit again</button>
                    </>
                ) : (
                    <>
                        <div className='form-group'>
                            Balance: <span style={ { fontWeight: 'bold' } }>{context.currentUser.balance}</span><br/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="amount">Deposit Amount</label>
                            <input className='form-control' id="amount" autoFocus type="text" value={amount} onChange={handleAmountChange} onKeyPress={ pEvent => { if ( pEvent.key === 'Enter' ){ handleDeposit(); } } }></input>
                        </div>
                        <button className='btn btn-primary' type='button' onClick={handleDeposit} { ...{ disabled: isDepositEnabled ? null : 'disabled' } }>Deposit</button>
                    </>
                ) }
            ></Card>
        </>
    );
}
