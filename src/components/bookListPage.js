import React, {Component} from 'react';
import { connect } from "react-redux";

import { discoverBookListDetail,discoverBookListTag } from "../actions/bookListAction";

import './common/style/leftmenu.scss';
import './common/style/rankingpage.scss';

import { BackTop,Spin } from "antd";
import NormalLeftMenu from './common/component-module/NormalLeftMenu';
import NormalTopMenu from './common/component-module/NormalTopMenu';
import NewBookList from './common//component-module/NewBookList';
import config from '../modules/config';


// 书单
class BookList extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: config.bookListTypes[0].title,
            curIndex: 0,
            params: "?duration=last-seven-days&sort=collectorCount"
        }
    }
    componentDidMount(){
        this.props.getDiscoverBookListTag();
    }
    renderStatus(status){
        let content  = <div></div>;
        if(!status){
            content = <NewBookList bookListData={this.props.bookList.bookList}></NewBookList>
        } else {
            content = <div className="content"><Spin size="large" tip="加载中"></Spin></div>
        }
        return  content
    }
    getBookListDetail(index) {
        let params = "";
        if (index === 0) {
            params = "?duration=last-seven-days&sort=collectorCount";
        } else if (index === 1) {
            params = "?duration=all&sort=created";
        } else if (index === 2) {
            params = "?duration=all&sort=collectorCount";
        }
        this.props.getDiscoverBookListDetail(params);
        return params;
    }
    getSubClickMenuItem(index, item) {
        let params = "";
        if (item === "男性") {
            params = this.state.params + "&gender=male";
        } else if (item === "女性") {
            params = this.state.params + "&gender=female";
        } else {
            params = this.state.params + "&tag=" + item;
        }
        this.props.getDiscoverBookListDetail(params);
    }
    render(){
        const {bookList}  = this.props;
        return (
            <section className="page-ranking">
                <BackTop></BackTop>
                <section className="container">
                    <div className="c-full-sideBar">
                        <NormalLeftMenu
                            menuData={config.bookListTypes}
                            clickMenuItem={(index, item)=>{
                                let params = this.getBookListDetail(index);
                                this.setState({title: item.title, curIndex: index, params: params})
                            }}
                        ></NormalLeftMenu>
                    </div>
                    <div className="content">
                        <div className="title">{this.state.title}</div>
                        <NormalTopMenu
                            AllMenuItem={(index, item) => {
                                this.getBookListDetail(this.state.curIndex);
                            }}
                            tagsData={bookList.tags}
                            ClickMenuItem={(index, item)=>{
                                let params='',tag=item.tags[0];
                                if(tag==='男性'){
                                    params = this.state.params+'&gender=male';
                                }else if(tag==='女性'){
                                    params = this.state.params+'&gender=female';
                                } else {
                                    params = this.state.params + "&tag=" + tag;
                                }
                                this.props.getDiscoverBookListDetail(params);
                            }}
                            subClickMenuItem={(index, item)=>{
                                this.getSubClickMenuItem(index, item);
                            }}
                        ></NormalTopMenu>
                        {this.renderStatus(bookList.detailState)}
                    </div>
                </section>
            </section>
        )
    }
}


const mapStateToProps = (state) => {
    const {bookList}  = state;
    return {
        bookList
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getDiscoverBookListTag: () => {
            dispatch(discoverBookListTag());
        },
        getDiscoverBookListDetail: (params) => {
            dispatch(discoverBookListDetail(params))
        }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookList);