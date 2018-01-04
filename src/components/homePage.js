import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import history from './common/History';
import queryString from 'query-string';

import api from "../modules/api/api";
import { discoverCategoryList } from "../actions/categoryAction";
import { getSpread } from "../actions/homeAction";
import { rankingList } from "../actions/rankingAction";
import { discoverSingleMenuList } from "../actions/selectionAction";

import { Carousel, BackTop } from "antd";
import "../components/common/style/home.scss";


function getImageUrl(curUrl) {
  if (curUrl.indexOf(api.IMG_BASE_URL) != -1) {
      return curUrl;
  }
  return api.IMG_BASE_URL + curUrl;
}

function getLatelyFollower(latelyFollower) {
  if (latelyFollower >= 10000) {
      return (latelyFollower / 10000).toFixed(2) + "万";
  } else {
      return latelyFollower + "";
  }
}

// 函数式组件
const CategoryList = withRouter(function(props) {
  const { classname, style, title, categoryList } = props;
  return (
    <div className="category-block" style={{ ...style }}>
      <div className="title">
        <i className="icon icon-man" />
        <span className="name">{title}</span>
        <a href="/category?gender=male" className="more">
          更多<span className="arrow-more" />
        </a>
      </div>
      <div className="category-list">
        {categoryList.map(function(item, index, arr) {
          return (
            <a
              key={index}
              onClick={() => {
                if(title==='男生'){
                  props.history.push({
                    pathname: '/category',
                    search: `?gender=male&major=${item.name}&index=${index}`
                  })
                }
                if(title==='女生'){
                  props.history.push({
                    pathname: '/category',
                    search: `?gender=female&major=${item.name}&index=${index}`
                  })
                }
                if(title==='出版'){
                  props.history.push({
                    pathname: '/category',
                    search: `?gender=press&major=${item.name}&index=${index}`
                  })
                }
              }}
            >
              <p className="name">{item.name}</p>
              <p className="bookCount">{item.bookCount}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
})
const RankList = withRouter( function (props) {
  const { className, style, title, rankList } = props;
  return (
    <div className="ranking">
      <div className="ranking-block">
        <div className="title">
          <i className="icon icon-ranking" />
          <span className="name">{title}</span>
          <a className="more">
            全部<span className="arrow-more" />
          </a>
        </div>
        <div className="ranking-nav">
          <span id="ranking-male" className="active">
            男生榜
          </span>
          <span className="verticaleLine">|</span>
          <span id="ranking-female">女生榜</span>
        </div>
        <div className="ranking-list">
          <div className="male-list">
            {rankList.map((value, index) => {
              if (index >= 10) return;
              return (
                <a
                  key={index}
                  onClick={() => {
                    props.history.push({
                      pathname: "/book",
                      search: queryString.stringify({bookId: value._id})
                    });
                  }}
                  className="first"
                >
                  <div className="num-index clearfix" style={{ width: 'auto' }}>
                    <span className={"No " + "No" + (index+1)}>{index + 1}</span>
                    {index===0?<img src={getImageUrl(value.cover)} className="cover" />:null}
                  </div>
                  <div className="text-block">
                    <p className="name">{value.title}</p>
                    <p className="latelyFollower">
                      <span>{getLatelyFollower(value.latelyFollower)}</span>人气
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
})
const RecommentList = withRouter( function (props) {
  const { className, style, title, recommendList } = props;
  return (
    <div className="recommend">
      <div className="title">
        <a className="name">{title}</a>
        <a className="more">查看更多<span className="arrow-more"></span></a>
      </div>
      <div className="books-list">
        { recommendList.map(function(item, index){
          let book = item.book;
          return (
            <a className="book" key={index} onClick={() => {
              props.history.push({
                pathname: '/book',
                search: queryString.stringify({bookId: book._id})
              })
            }}>
              <img className="cover" src={book.cover} alt={book.title}/>
              <div className="right">
                <h4 className="name">
                  <span>{book.title}</span>
                  <span className="tag-serial">{book.isSerial?'连载':'完结'}</span>
                </h4>
                <p className="desc">{book.shortIntro}</p>
                <p className="popularity">
                  <span>{book.author}</span>
                  <span className="split">|</span>
                  <span className="c-red">{getLatelyFollower(book.latelyFollower)}</span>人气
                </p>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
})

// Home

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
      this.props.getCategoryList();
      this.props.getRankingList("54d42d92321052167dfb75e3");
      this.props.getDiscoverSingleMenuList();
      this.props.getSpread();
  }
  render() {
    const { home } = this.props;
    return (
      <div className="page-home">
        <BackTop />
        <section className="container content">
          <div className="content-left">
            <div className="category">
              <CategoryList
                title="男生"
                categoryList={home.tagsState ? home.tags.male : []}
              />
              <CategoryList
                title="女生"
                categoryList={home.tagsState ? home.tags.female : []}
              />
              <CategoryList
                title="出版"
                categoryList={home.tagsState ? home.tags.press : []}
              />
            </div>
            <RankList title="排行榜" rankList={home.chartsDetailBooks}></RankList>
          </div>
          <div className="content-right">
            <div className="banner" style={{marginBottom:35}}>
              {
                home.spreadData.length > 0 ?
                <Carousel accessibility arrows centerMode autoplay>
                  { home.spreadData.map(function(item, index){
                    return (
                      <div key={index} onClick={() => {
                        history.push({
                          pathname: '/book',
                          search: queryString.stringify({bookId: item.link})
                        })
                      }}>
                        <img src={item.img} alt=""/>
                      </div>
                    )
                  })}
                </Carousel>
                : null
              }
            </div>
            {home.nodes.map(function(item,index){
              if(index>2) return
              return (
                <RecommentList 
                  key={index} 
                  title={item.title}
                  recommendList={item.books}
                  ></RecommentList>
              )
            })}
          </div>
        </section>
        <section className="container">
            <div className="hot-items">
              { home.spreadData.length > 0 ?
                home.spreadData.map(function(item, index){
                  let hotItemClass = 'hot-item hot-item-first';
                  if(index === 1){
                    hotItemClass = 'hot-item'
                  } else if( index === 2){
                    hotItemClass = 'hot-item hot-item-lase'
                  }
                  return <a 
                    key={index}
                    className={hotItemClass}
                    href={'/book?'+queryString.stringify({bookId: item.link})}
                    // onClick={() => {
                    //   this.props.history.push({
                    //     pathname: '/book',
                    //     search: queryString.stringify({bookId: item.link})
                    //   })
                    // }} 
                    >
                    <img src={item.img} alt=""/>
                  </a>
                })  
                :
                null
              }
            </div>
        </section>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    const {home} = state;
    return {
        home
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getCategoryList: ()=> {
            dispatch(discoverCategoryList());
        },
        getRankingList: (id) => {
            dispatch(rankingList(id));
        },
        getSpread: () => {
            dispatch(getSpread());
        },
        getDiscoverSingleMenuList: () => {
            dispatch(discoverSingleMenuList());
        }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Home));
