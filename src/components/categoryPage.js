import React, {Component} from 'react';
import { connect } from "react-redux";
import { discoverCategoryBooks, discoverCategoryListV2, discoverCategoryList } from "../actions/categoryAction";

import './common/style/leftmenu.scss';
import './common/style/rankingpage.scss';

import { BackTop ,Spin} from "antd";
import NormalLeftMenu  from './common/component-module/NormalLeftMenu';
import NormalTopMenu from './common/component-module/NormalTopMenu';
import BookList from './common/component-module/BookList';
import config from '../modules/config';
import queryString from 'query-string';

// Category
class Category extends Component {
    constructor(props){
        super(props);
        let { gender, major, index }  = queryString.parse(this.props.location.search);
        this.typeGender = gender ? '&gender='+gender : '&gender=male';
        this.typeBookMajor = major ? '&major='+major : '&major=玄幻';
        this.defaultIndex = index ? index : 0;
        this.startParams = "?start=0&limit=50";
        this.typeBookMinor = "&minor=";
        this.typeBookStatus = '&type=hot';
        this.state = {
            title: config.bookListTypes[0].title,
            curIndex: 0
        }

    }
    getBookListDetail(index){
        let params, returnParams = '';
        if(index === 0){
            returnParams = '&gender=male';
            params = '?gender=male&type=hot&major=玄幻&minor=&start=0&limit=50'
        } else if (index === 1) {
            returnParams = "&gender=female";
            params = "?gender=female&type=hot&major=古代言情&minor=&start=0&limit=50";
        } else if (index === 2) {
            returnParams = "&gender=press";
            params = "?gender=press&type=&major=传记名著&minor=&start=0&limit=50";
        }
        this.props.getCategoryBooks(params);
        return returnParams;
    }
    getData(){
        this.props.getCategoryBooks(this.startParams + this.typeGender + this.typeBookMajor + this.typeBookMinor + this.typeBookStatus);
    }
    renderStatus(status){
        let content = <div></div>;
        if(!status){
            content = <BookList bookListData={this.props.category.bookList}></BookList>
        } else {
            content = <div className="content"><Spin size="large" tip="加载中"></Spin></div>
        }
        return content;
    }
    render(){
        const {category}  = this.props;
        return (
            <section className="page-ranking">
                <BackTop></BackTop>
                <section className="container">
                    <div className="c-full-sideBar">
                        <NormalLeftMenu
                            menuData={config.bookListCategory}
                            clickMenuItem={(index, item)=>{
                                this.typeGender = this.getBookListDetail(index);
                                this.setState({title: item.title, curIndex: index})
                            }}
                        ></NormalLeftMenu>
                    </div>
                    <div className="content">
                        <div className="title">{this.state.title}</div>
                        { category.tagsV2.length > 0 ?
                            <NormalTopMenu 
                                defaultIndex={this.defaultIndex}
                                title={'作品类型'}
                                tagsData={category.tagsV2[this.state.curIndex]}
                                ClickMenuItem={(index, item) => {
                                    this.typeBookMajor = '&major='+ item.name;
                                    this.typeBookMinor = '&minor=';
                                    this.getData()
                                }}
                                subClickMenuItem={(index, item ) => {
                                    if(item === '全部'){
                                        this.typeBookMinor = '&minor=';
                                    } else {
                                        this.typeBookMinor = '&minor='+ item;
                                    }
                                    this.getData();
                                }}
                                >

                            </NormalTopMenu>
                            : <div></div>
                        }
                        {this.state.curIndex === 2 ? null :
                            <NormalTopMenu tagsData={config.subCategory} title={"更多筛选"} ClickMenuItem={(index, item) => {
                                this.typeBookStatus = "&type=" + item.code;
                                this.getData();
                            }}/>
                        }
                        {this.renderStatus(category.booksState)}
                    </div>
                </section>
            </section>
        )
    }
    componentDidMount(){
        this.props.getCategoryListV2();
        this.getData();
    }
}

const mapStateToProps = (state) => {
    const {category} = state;
    return {
        category
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryList: () => {
            dispatch(discoverCategoryList());
        },
        getCategoryListV2: () => {
            dispatch(discoverCategoryListV2());
        },
        getCategoryBooks: (params) => {
            dispatch(discoverCategoryBooks(params))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);