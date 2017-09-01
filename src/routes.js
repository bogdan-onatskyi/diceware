import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

// import Home from './views/home/home';
import Index from './views/index';

export default () => (
    <BrowserRouter>
        <div>
            <Route path='/' component={Index}/>
        </div>
    </BrowserRouter>
);
