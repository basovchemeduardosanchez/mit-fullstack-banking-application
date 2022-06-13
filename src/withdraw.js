import React, { useContext, useState } from 'react';
import { UserContext, Card } from './context';

export function Withdraw(){
    const context = useContext(UserContext);
    const [ status, setStatus ] = useState( '' );
    const [ isWithdrawing, setIsWithdrawing ] = useState( false );
    const [ amount, setAmount ] = useState( '' );
    const [ isWithdrawEnabled, setIsWithdrawEnabled ] = useState( false );

    function isAmountValid( pAmount = amount ){
        return !!pAmount && !isNaN(pAmount) && pAmount > 0;
    }

    function handleWithdraw(){
        if ( !context.currentUser ) return;

        setStatus( '' );
        if ( !isAmountValid() ) {
            setStatus( 'Error: The amount is invalid' );
            setTimeout(() => setStatus(''),3000);
            return;
        }

        const newBalance = context.currentUser.balance - parseFloat( amount );

        if ( newBalance < 0 ){
            setStatus( 'Error: The amount is greater than the current balance' );
            setTimeout(() => setStatus(''),3000);
            return;
        }

        fetch( `/account/update/${ encodeURIComponent( context.currentUser.email ) }/${ encodeURIComponent( -1 * parseFloat( amount ) ) }` )
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
                        setIsWithdrawing( true );
                        context.setCurrentUser( json.value );
                    } );
            } );
    }
    function handleAmountChange( pEvent ){
        const newAmount = pEvent.currentTarget.value;
        setAmount( newAmount );
        setIsWithdrawEnabled( newAmount !== '' );
    }

    return (
        <>
            <h1>Withdraw</h1>
            <Card
                txtcolor="black"
                status={ status }
                body={ isWithdrawing ? (
                    <>
                        Success!<br/><br/>
                        New balance: <span style={ { fontWeight: 'bold' } }>{context.currentUser.balance}</span><br/><br/>
                        <button className='btn btn-primary' type='button' onClick={() => setIsWithdrawing( false )}>Withdraw again</button>
                    </>
                ) : (
                    <>
                        <div className='form-group'>
                            Balance: <span style={ { fontWeight: 'bold' } }>{context.currentUser.balance}</span><br/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="amount">Withdraw Amount</label>
                            <input className='form-control' id="amount" autoFocus type="text" value={amount} onChange={handleAmountChange} onKeyPress={ pEvent => { if ( pEvent.key === 'Enter' ){ handleWithdraw(); } } }></input>
                        </div>
                        <button className='btn btn-primary' type='button' onClick={handleWithdraw} { ...{ disabled: isWithdrawEnabled ? null : 'disabled' } }>Withdraw</button>
                    </>
                ) }
            ></Card>
        </>
    );
}
