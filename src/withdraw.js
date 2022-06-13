import React, { useContext, useState } from 'react';
import { UserContext, Card } from './context';

export function Withdraw(){
    const context = useContext(UserContext);
    const [ status, setStatus ] = useState( '' );
    const [ isWithdrawing, setIsWithdrawing ] = useState( false );
    const [ balance, setBalance ] = useState( context.users[0].balance );
    const [ amount, setAmount ] = useState( '' );
    const [ isWithdrawEnabled, setIsWithdrawEnabled ] = useState( false );

    function isAmountValid( pAmount = amount ){
        return !!pAmount && !isNaN(pAmount) && pAmount > 0;
    }

    function handleWithdraw(){
        setStatus( '' );
        if ( !isAmountValid() ) {
            setStatus( 'Error: The amount is invalid' );
            setTimeout(() => setStatus(''),3000);
            return;
        }

        const newBalance = balance - parseFloat( amount );
        
        if ( newBalance < 0 ){
            setStatus( 'Error: The amount is greater than the current balance' );
            setTimeout(() => setStatus(''),3000);
            return;
        }

        context.users[0].balance = newBalance;
        setAmount( '' );
        setBalance( newBalance );
        setIsWithdrawing( true );
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
                        New balance: <span style={ { fontWeight: 'bold' } }>{balance}</span><br/><br/>
                        <button className='btn btn-primary' type='button' onClick={() => setIsWithdrawing( false )}>Withdraw again</button>
                    </>
                ) : (
                    <>
                        <div className='form-group'>
                            Balance: <span style={ { fontWeight: 'bold' } }>{balance}</span><br/>
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
