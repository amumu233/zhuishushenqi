import React, { Component } from 'react';
import { connect } from "react-redux";
import { discoverBookDetail, discoverMenuList } from "../actions/selectionAction";

import './common/style/leftmenu.scss';
import './common/style/rankingpage.scss';

import { BackTop, Spin } from "antd";
import NormalLeftMenu from './common/component-module/NormalLeftMenu';
import BookList from './common/component-module/BookList';

// Selection
class Selection extends Component {
    constructor(props){
        super(props);
        this.state ={
            title: '本周热推'
        }
    }
    componentDidMount(){
        this.props.getDiscoverMenuList();
    }
    renderStatus(status){
        let content = (<div></div>);
        if(!status){
            content = <BookList bookListData={this.props.selection.bookList}></BookList>
        } else {
            content = <div className="content"><Spin size="large" tip="加载中"></Spin></div>
        }
        return (
            <div className="content">
                <div className="title">{this.state.title}</div>
                {content}
            </div>
        )
    }
    render(){
        const {selection} = this.props;
        return (
            <section className="page-ranking">
                <BackTop></BackTop>
                <section className="container">
                    <div className="c-full-sideBar">
                        <NormalLeftMenu 
                            clickMenuItem={(index, item) => {
                                this.props.getDiscoverBookDetail(item._id);
                                this.setState({title: item.title})
                            }}
                            menuData={this.props.selection.nodes}
                            >
                        </NormalLeftMenu>
                    </div>
                    {this.renderStatus(selection.selectionState)}
                </section>
            </section>
        )
    }
}


const mapStateToProps = (state) => {
    const {selection} = state;
    return {
        selection
    }
};
const mapDispatchToProps = (dispatch) => ({
    getDiscoverMenuList: () => {
        dispatch(discoverMenuList());
    },
    getDiscoverBookDetail: (id) => {
        dispatch(discoverBookDetail(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Selection);