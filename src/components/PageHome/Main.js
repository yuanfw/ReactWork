/**
 * Created by zhangyuanyuan031 on 17/5/22.
 */

import React from 'react'
import {withRouter} from 'react-router'

class Main extends React.Component{
    render(){
        return <main>
            {this.props.children}
        </main>
    }
}

export default withRouter(Main)
