/**
 * 封装一个分页插件
 * Created by zhangyuanyuan031 on 17/6/12.
 */
import React from 'react'
import {Pagination} from 'react-bootstrap'

class TablePages extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let {totals,onSelect,activePage} = this.props;
        return <Pagination
            prev
            next
            first
            last
            ellipsis={true}
            boundaryLinks={true}
            items={totals}
            maxButtons={10}
            activePage={activePage || 1}
            onSelect={onSelect}
        />
    }
}

export default TablePages;