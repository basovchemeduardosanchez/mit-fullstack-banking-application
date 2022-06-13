import React, { useContext } from 'react';
import { Card, UserContext } from './context';

export function AllData(){
    const ctx = useContext(UserContext);
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ctx.users.map( ( pUser, pIndex ) => {
                                    return (
                                        <tr key={pIndex}>
                                            <td>{pUser.email}</td>
                                            <td>{pUser.name}</td>
                                            <td>{pUser.password}</td>
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
