import React, { useState } from 'react';
import Routes from './Routes';
import Nav from './shared/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
    const [user, setUser] = useState(false);
    return (
        <React.Fragment>
            <ToastContainer/>
            <Nav user={ user } />
            <Routes user={ user } setUser={ setUser }/>
        </React.Fragment>
    );
}

export default App;

/*
yarn add axios, checks the url and can do things
import Axios from 'axios';
const resp = Axios.get('/test').then(resp => {
    console.log(resp);
});

*/