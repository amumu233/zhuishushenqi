import React, {Component} from 'react';
import { connect } from "react-redux";
import { ranking, rankingList } from "../actions/rankingAction";

import './common/style/leftmenu.scss';
import './common/style/rankingpage.scss';

import { BackTop, Spin } from "antd";
import LeftMenu from './common/component-module/LeftMenu';
import TopMenu from './common/component-module/TopMenu';
import BookList from './common/component-module/BookList';

// 排行榜
class Ranking extends Component {
    constructor(props){
        super(props);
        this.state ={
            showMaleOther: false,
            showFemaleOther: false,
            currentId: '',
            type: '',
            currentRank: {}
        }
    }
    componentDidMount(){
        this.props.getRanking();
        this.props.getRankingList("54d42d92321052167dfb75e3");
        this.setState({
            currentRank: {
                "_id": "54d42d92321052167dfb75e3",
                "title": "追书最热榜 Top100",
                "cover": "/ranking-cover/142319144267827",
                "collapse": false,
                "monthRank": "564d820bc319238a644fb408",
                "totalRank": "564d8494fe996c25652644d2",
                "shortTitle": "最热榜"
            }
        })
    }
    componentWillReceiveProps(nextProps){
        const {ranking, isLoadingDetail}  = nextProps;
        if(ranking.male.length > 0 && !isLoadingDetail){
            
        }
    }
    renderStatus(status){
        let content = <div></div>;
        if(!status){
            content = <BookList bookListData={this.props.ranking.chartsDetailBooks}></BookList>
        } else {
            content = <div className="content"><Spin style={{margin: 'auto'}} size="large" tip="加载中"></Spin></div>
        }
        return (
            <div className="content">
                <div className="title">{this.state.currentRank.title}</div>
                <TopMenu 
                    rankData={this.state.currentRank}
                    clickMenuItem={(index, item, id) => {
                        this.props.getRankingList(id);
                    }}
                ></TopMenu>
                { content }
            </div>
        )
    }
    render(){
        const {ranking} = this.props;
        return (
            <section className="page-ranking">
                <BackTop></BackTop>
                <section className="container">
                    <div className="c-full-sideBar">
                        <LeftMenu
                            defaultIndex={0}
                            menuData={ranking.male.concat(ranking.female)}
                            titles={["男生","女生"]}
                            clickMenuItem={(index, item) => {
                                this.props.getRankingList(item._id);
                                this.setState({currentRank: item})
                            }}
                        ></LeftMenu>
                    </div>
                    {this.renderStatus(ranking.isLoadingDetail)}
                </section>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    const {ranking} = state;
    return {
        ranking
    }
};
const mapDispatchToProps = (dispatch) => ({
    getRanking: () => {
        dispatch(ranking());
    },
    getRankingList: (id) => {
        dispatch(rankingList(id));
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Ranking);