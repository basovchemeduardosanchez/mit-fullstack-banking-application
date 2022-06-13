import React, { useState } from 'react';

import { HashRouter, Route, } from 'react-router-dom';
import { UserContext } from './context'; 
import { NavBar } from './navbar';
import { Home } from './home';
import { CreateAccount } from './createaccount';
import { Login } from './login';
import { Deposit } from './deposit';
import { Withdraw } from './withdraw';
// import { Balance } from './balance';
import { AllData } from './alldata';

// SECTION Import Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// !SECTION Import Bootstrap

import './App.css';
import { Redirect } from 'react-router-dom';

function App() {
    const [ currentUser, setCurrentUser ] = useState( null );

    return (
        <div className="App">
            <HashRouter>
                <UserContext.Provider value={{ currentUser: currentUser, setCurrentUser: setCurrentUser/*, users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]*/}}>
                    <NavBar/>
                    <div className="container" style={{padding: '20px'}}>
                        <Route path="/" exact component={Home} />
                        <Route path="/CreateAccount/" component={CreateAccount} />
                        <UserContext.Consumer>
                            { value =>
                                <Route path="/login/">
                                    { value.currentUser ? <Redirect to="/" /> : <Login /> }
                                </Route>
                            }
                        </UserContext.Consumer>
                        <Route path="/logout/">
                            <Redirect to="/login/" />
                        </Route>
                        <Route path="/deposit/" component={Deposit} />
                        <Route path="/withdraw/" component={Withdraw} />
                        { /* <Route path="/balance/" component={Balance} />*/ }
                        <Route path="/alldata/" component={AllData} />
                    </div>
                </UserContext.Provider>
            </HashRouter>
        </div>
    );
}

export default App;
