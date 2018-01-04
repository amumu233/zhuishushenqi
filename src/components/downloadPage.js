import React, {Component} from 'react';
import './common/style/download.scss';
import history from './common/History'

export default class Download extends Component {
    constructor(props){
        super(props);
    }
        render(){
            return (
                <div className="page-download">
                    <a href="http://www.zhuishushenqi.com/download" target="_blank">点击进入追书神器下载页面</a>
                    <div onClick={() => {
                        this.props.history.push({
                            pathname: '/rank'
                        })
                    }} >hahahhaha</div>
                </div>
            )
        }
    
}