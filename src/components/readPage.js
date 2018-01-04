import React from 'react';
import { connect } from "react-redux";

import * as ConstData from '../modules//constants/ConstData';
import { readBookChapterList, readBookChapterDetail, getReadBookChapterListAndStartRead } from "../actions/readAction";

import { Link } from "react-router-dom";
import { message, Modal, Spin } from "antd";
import './common/style/readpage.scss';

// 阅读
class Read extends React.Component {
    constructor(props){
        super(props);
        const domEle = document.body;
        domEle.style.background = '#d1d6be';
        console.log(this.props.location.state);
        this.data = this.props.location.state;
        this.type = this.data ? this.data.type : ConstData.DATA_INVAILD;
        this.bookId = this.data ? this.data.bookId : -1;
        this.bookName = this.data ? this.data.bookName : '';
        this.state ={
            chapterUrl: '',
            title: '',
            leftToolBarTop: 40,
            rightToolBarBottom: 0,
            visible: false
        };
        this.showModal = () => {
            this.setState({
                visible: true
            })
        };
        this.newHandleScroll = this.handleScroll.bind(this);
    }
    componentDidMount(){
        if(this.type === ConstData.DATA_INVAILD){
            return;
        }
        if(this.type === ConstData.READ_BOOK_START){
            this.chapterIndex = 0;
            this.props.getReadBookChapterListAndStartRead(this.bookId)
        } else if (this.type === ConstData.READ_BOOK_MIDDLE) {
            this.chapter = this.data ? this.data.chapter: {};
            this.chapterIndex = this.chapter.num;
            this.props.getReadBookChapterDetail(this.chapter.chapterurl,this.chapter.num, this.chapter.title);
            this.getReadBookChapterList(this.bookId);
        }
        window.addEventListener('scroll',this.newHandleScroll)
    }
    componentWillUnmount(){
        window.removeEventListener('scroll',this.newHandleScroll);
    }
    handleScroll(e){

    }
    renderContentByDataState(){
        let dataState = this.props.read.dataState;
        let renderContent = <div></div>;
        switch(dataState){
            case ConstData.DATA_EMPTY:
                renderContent = <div>数据为空</div>
                break;
            case ConstData.DATA_LOADING:
                renderContent = <Spin size="large" tip="加载中"></Spin>
                break;
            case ConstData.DATA_SUCCESS:
                renderContent = (
                    <div>
                        <h4 className="title">
                            <span>{this.bookName}</span>
                            <span className="current-chapter">{this.props.read.chapterTitle}</span>
                        </h4>
                        <div className="left-toolbar" style={{top: this.state.leftToolBarTop }}>
                            <a href="/home" title="首页" className="home">首页</a>
                            {/* <Link to="/home" className="home"></Link> */}
                            <a className="detail" onClick={() =>{
                                this.props.history.goBack()
                            }} title="返回详情页">详情页</a>
                            <a href="/download" title="下载" className="download">下载</a>
                            {/* <Link to="/download" className="download"></Link> */}
                        </div>
                        <div className="right-toolbar" style={{bottom: this.state.rightToolBarBottom }}>
                            <a className="prev" onClick={()=>{
                                if(this.chapterIndex===0){
                                    message.warning('Hi,往前没有章节了')
                                } else if(this.chapterIndex>0) {
                                    let  curChapter = this.props.read.bookChapterList[--this.chapterIndex];
                                    this.props.getReadBookChapterDetail(curChapter.link,this.chapterIndex,curChapter.title);
                                    this.setState({
                                        title: curChapter.title
                                    })
                                }
                            }}>上一章</a>
                            <a title="章节目录" className="list" onClick={()=>{
                                this.showModal();
                            }}>章节目录</a>
                            <a title="下一张" className="next" onClick={()=>{
                                if (this.chapterIndex == this.props.read.totalChapter - 1) {
                                    message.warning('Dear,往后没有章节了！！！');
                                } else {
                                    let curChapter = this.props.read.bookChapterList[++this.chapterIndex];
                                    this.props.getReadBookChapterDetail(curChapter.link, this.chapterIndex, curChapter.title);
                                    this.setState({
                                        title: curChapter.title
                                    });
                                }
                            }}>下一章</a>
                        </div>
                        <div ref="content" className="content">
                            <input type="hidden" id="J_vip" name="" value="false"/>
                            <div className="inner-text"
                                dangerouslySetInnerHTML={{__html: this.props.read.chapterDetail}}
                            ></div>
                        </div>
                    </div>
                )
                break;
            case ConstData.DATA_FAILURE:
                break;
            case ConstData.NET_FAILURE:
                break;
            default:
                renderContent = <div>默认情况</div>;
                break
        }
        return renderContent;
    }

    render(){
        const {read}  = this.props;
        const _this = this;
        return (
            <div className="page-reader-wraper">
                {this.renderContentByDataState()}
                <Modal
                    title="章节目录"
                    footer={null}
                    closable={false}
                    bodyStyle={{maxHeight: 350, overflow: 'auto'}}
                    visible={this.state.visible}
                >
                { read.bookChapterList.length>0?
                    read.bookChapterList.map(function(item, index){
                        let readable;
                        if(item.unreadable){
                            readable = <span>lock</span>
                        } else {
                            readable = null;
                        }
                        return (
                            <a 
                                key={index}
                                onClick={()=>{
                                    _this.chapterIndex = index;
                                    _this.props.getReadBookChapterDetail(item.link, index, item.title);
                                    _this.setState({
                                        title: item.title
                                    });
                                    _this.setState({
                                        visible: false,
                                    });
                                }}
                            >
                                <p style={{margin: "10px 0px"}}>{item.title}{readable}</p>
                                <div style={{height: 1, backgroundColor: '#C2C2C2'}}/>
                            </a>
                        )
                    })
                    :null    
                }
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {read} = state;
    return {
        read
    }
}
const mapDispatchToProps = (dispatch) => ({
    getReadBookChapterListAndStartRead: (id) => {
        dispatch(getReadBookChapterListAndStartRead(id))
    }, 
    getReadBookChapterList: (id) => {
        dispatch(readBookChapterList(id))
    }, 
    getReadBookChapterDetail: (chapterUrl, num, title) => {
        dispatch(readBookChapterDetail(chapterUrl, num, title))
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Read);