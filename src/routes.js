import React from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';

import Index from './views/index';
import Info from './views/info';
import Contacts from './views/contacts';
import Oops from './views/oops';

const AppRouter = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Index}/>
            <Route path="/info" component={Info}/>
            <Route path="/contacts" component={Contacts}/>
            <Route path="/oops" component={Oops}/>
        </Switch>
    </HashRouter>
);

export default AppRouter;