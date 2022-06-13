import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import { UserContext } from './context';

export function NavBar(){
    const location = useLocation();
    const history = useHistory();
    const ctx = useContext(UserContext);

    return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Bad Bank</a>
                <button className={`navbar-toggler ml-auto${ ctx.currentUser ? ' mr-2' : '' }`} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item" title="The home page of the application">
                            <a className={ `nav-link ${ location.pathname === '/' ? 'active' : '' }` } href="#/">Home</a>
                        </li>
                        <li className="nav-item" title="A page to create accounts in the application">
                            <a className={ `nav-link ${ location.pathname === '/CreateAccount/' ? 'active' : '' }` } href="#/CreateAccount/">Create Account</a>
                        </li>
                        <li className="nav-item" title="A page to deposit in the first account's balance">
                            <a className={ `nav-link ${ location.pathname === '/deposit/' ? 'active' : '' }` } href="#/deposit/">Deposit</a>
                        </li>
                        <li className="nav-item" title="A page to withdraw from the first account's balance">
                            <a className={ `nav-link ${ location.pathname === '/withdraw/' ? 'active' : '' }` } href="#/withdraw/">Withdraw</a>
                        </li>
                        { /*<li className="nav-item" title="A page to see the first account's current balance">
                            <a className={ `nav-link ${ location.pathname === '/balance/' ? 'active' : '' }` } href="#/balance/">Balance</a>
                        </li>*/ }
                        <li className="nav-item" title="A page to see al data stored in the application">
                            <a className={ `nav-link ${ location.pathname === '/alldata/' ? 'active' : '' }` } href="#/alldata/">AllData</a>
                        </li>
                        { ctx.currentUser ? (
                            <li className="nav-item" title="Sign out of the application">
                                <a className="nav-link" onClick={() => {
                                    ctx.setCurrentUser(null);
                                    history.push( '/logout/' );
                                }}>Logout</a>
                            </li>
                        ) : (
                            <li className="nav-item" title="A page to login into the application">
                                <a className={ `nav-link ${ location.pathname === '/login/' ? 'active' : '' }` } href="#/login/">Login</a>
                            </li>
                        ) }
                    </ul>
                </div>
                { ctx.currentUser ? (
                    <span className="navbar-text">
                        { ctx.currentUser.email }
                    </span>
                ) : null }
            </nav>
        </>
    );
}