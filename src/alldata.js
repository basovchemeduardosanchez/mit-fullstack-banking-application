import React, { /*useContext,*/ useEffect, useState } from 'react';
import { Card/*, UserContext*/ } from './context';

export function AllData(){
    // const ctx = useContext(UserContext);

    let [ data, setData ] = useState( [] );

    useEffect( async () => {
        setData(
            await fetch( '/account/all' )
                .then( pResponse => pResponse.json() )
        );
    }, [] );

    return (
        <>
            <h5>All Data in Store</h5>
            <Card
                fullWidth={true}
                txtcolor="black"
                body={
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Name</th>
                                <th>Password</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                //ctx.users.map( ( pUser, pIndex ) => {
                                data.map( ( pUser, pIndex ) => {
                                    return (
                                        <tr key={pIndex}>
                                            <td>{pUser.email}</td>
                                            <td>{pUser.name}</td>
                                            <td>{pUser.password}</td>
                                            <td>{pUser.balance}</td>
                                        </tr>
                                    );
                                } )
                            }
                        </tbody>
                    </table>
                }
            ></Card>
        </>
    );
}
