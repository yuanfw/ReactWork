import React from 'react'
import "assets/less/common.less"
import 'assets/less/login.less'

let DevTools

if (__DEV__ && __COMPONENT_DEVTOOLS__) {
    DevTools = require('./DevTools').default
}


const App = ({children, location}) => (
    <div className="content-top">
        <div className="container-fluid">
            {children}
        </div>

        { DevTools && <DevTools /> }
    </div>
);

export default App;
