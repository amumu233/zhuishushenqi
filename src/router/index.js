import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import root from '../components/root';
import Bundle from '../components/common/component-module/Bundle';
import loadRead from 'bundle-loader?lazy&name=[name]!../components/readPage';
const Read = (props) => (
    <Bundle load={loadRead}>
        { (Read) => <Read {...props}></Read>}
    </Bundle>
)


const RouteConfig = (
    <BrowserRouter>
        <div>
            <Route path="/read" exact component={Read}></Route>
            <Route path="/" component={root}></Route>
        </div>
    </BrowserRouter>
)


export default RouteConfig;