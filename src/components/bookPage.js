import React, {Component} from 'react';
import { connect } from "react-redux";

import { bookDetail, bookHotReview, recommendBookList } from "../actions/bookAction";
import { readBookChapterList } from "../actions/readAction";

import { BackTop, Spin } from "antd";
import BDContent from './common/component-module/BDContent';
import BDRightMenu from './common/component-module/BDRightMenu';
import './common/style/bookpage.scss';
import queryString from 'query-string';

// 书籍详情
class Book extends Component {
    constructor(props){
        super(props);
        
        this.bookId = queryString.parse(this.props.location.search).bookId;
        console.log(this.bookId);
        this.state = {
            bookId: this.bookId
        }
    }
    componentDidMount(){
        this.props.getBookDetail(this.state.bookId);
        this.props.getBookHotReview(this.state.bookId);
        this.props.getRecommentBookList(this.state.bookId);
        this.props.readBookChapterList(this.state.bookId);
    }
    renderContent(type){
        let content = <div></div>;
        if(!type){
            content = <BDContent
                bookInfo={this.props.book.bookDetail}
                bookCommentList={this.props.book.bookCommentList}
                bookChapterList={this.props.book.bookChapterList}
            ></BDContent>
        } else {
            content = <div className="content"><Spin size="large" tip="加载中..."></Spin></div>
        }
        return content
    }
    render(){
        return (
            <div className="page-detail-container">
                <BackTop></BackTop>
                <BDRightMenu
                    recommendListData={this.props.book.bookRecommendList}
                ></BDRightMenu>
                {this.renderContent(this.props.book.isLoadingDetail)}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {book, read} = state;
    return {
        book,
        read
    }
}
const mapDispatchToProps = (dispatch) => ({
    getBookDetail: (id) => {
        dispatch(bookDetail(id))
    },
    getBookHotReview: (id) => {
        dispatch(bookHotReview(id))
    },
    getRecommentBookList: (id) => {
        dispatch(recommendBookList(id))
    },
    readBookChapterList: (id) => {
        dispatch(readBookChapterList(id))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Book)