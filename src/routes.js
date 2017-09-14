import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

import Index from './views/index';
import Info from './views/info';
import Contacts from './views/contacts';

const Component = () => (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={Index}/>
            <Route path='/info' component={Info}/>
            <Route path='/contacts' component={Contacts}/>
        </Switch>
    </HashRouter>
);

export default Component;