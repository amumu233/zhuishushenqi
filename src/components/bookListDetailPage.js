import React, {Component} from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { discoverBookListDetail } from "../actions/bookListDetailAction";
import './common/style/searchpage.scss';

import { BackTop, Spin } from "antd";
import BookList from './common/component-module/BookList2';

class BookListDetail extends Component {
    constructor(props){
        super(props);
        console.log(this.props.location);
        let data = this.props.location.state;
        this.bookListId = data? data.bookListId: '';
    }
    componentDidMount(){
        this.props.getBookListDetail(this.bookListId);
    }
    renderStatus(status) {
        let content = <div></div>;
        if(!status){
            content = <BookList bookListData={this.props.bookListDetail.books}></BookList>
        } else {
            content = <div className="content"><Spin size="large" tip="加载中"></Spin></div>
        }
        return (
            <div className="content">
                <div className="title">
                    <span className="c-red search-val">{this.props.bookListDetail.title}</span>书单
                    共<span className="c-red">{this.props.bookListDetail.total}</span>本
                </div>
                {content}
            </div>
        )
    }
    render(){
        return (
            <section className="page-search">
                bookListDetail test
                <BackTop></BackTop>
                {this.renderStatus(this.props.bookListDetail.detailState)}
            </section>
        )
    }


}

const mapStateToProps = (state) => {
    const {bookListDetail} = state;
    return {
        bookListDetail
    }
}

const mapDispatchToProps = (dispatch) => ({
    getBookListDetail: (id) => {
        console.log(id);
        dispatch(discoverBookListDetail(id));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookListDetail);