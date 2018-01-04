import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./store/configureStore";
import router from "./router";

import 'antd/dist/antd.css';

ReactDOM.render(
    <Provider store={store}>
    
        {router}
    
    </Provider>
    ,document.body.appendChild(document.createElement('div'))
);