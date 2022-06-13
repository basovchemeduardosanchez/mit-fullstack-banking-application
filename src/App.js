import React from 'react';

import { HashRouter, Route, } from 'react-router-dom';
import { UserContext } from './context'; 
import { NavBar } from './navbar';
import { Home } from './home';
import { CreateAccount } from './createaccount';
// import { Login } from './login';
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

function App() {
    return (
        <div className="App">
            <HashRouter>
                <NavBar/>
                <UserContext.Provider value={{users:[{name:'abel',email:'abel@mit.edu',password:'secret',balance:100}]}}>
                    <div className="container" style={{padding: '20px'}}>
                        <Route path="/" exact component={Home} />
                        <Route path="/CreateAccount/" component={CreateAccount} />
                        { /*<Route path="/login/" component={Login} />*/}
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
