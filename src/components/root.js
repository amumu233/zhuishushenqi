
import React, {Component} from "react";
import { Route } from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import {  } from "antd";
import Bundle from './common/component-module/Bundle';
import './common/style/root.scss';

import loadHome from 'bundle-loader?lazy&name=[name]!./homePage';
import loadSelection from 'bundle-loader?lazy&name=[name]!./selectionPage';
import loadCategory from 'bundle-loader?lazy&name=[name]!./categoryPage';
import loadBookList from 'bundle-loader?lazy&name=[name]!./bookListPage';
import loadRanking from 'bundle-loader?lazy&name=[name]!./rankingPage';
import loadDownload from 'bundle-loader?lazy&name=[name]!./downloadPage';
import loadBook from 'bundle-loader?lazy&name=[name]!./bookPage'
import loadBookListDetail from 'bundle-loader?lazy&name=[name]!./bookListDetailPage';


const Home = (props) => (
    <Bundle load={loadHome}>
        { (Home) => <Home {...props}></Home>}
    </Bundle>
);
const Selection = (props) => (
    <Bundle load={loadSelection}>
        { (Selection) => <Selection {...props}></Selection> }
    </Bundle>
);
const Category = (props) => (
    <Bundle load={loadCategory}>
        { (Category) => <Category {...props}></Category>}
    </Bundle>
)
const BookList = (props) => (
    <Bundle load={loadBookList}>
        { (BookList) => <BookList {...props}></BookList>}
    </Bundle>
)
const Ranking = (props) => (
    <Bundle load={loadRanking}>
        { (Ranking) => <Ranking {...props}></Ranking>}
    </Bundle>
)
const Download =(props) => (
    <Bundle load={loadDownload}>
        { (Download) => <Download {...props}></Download>}
    </Bundle>
)
const Book = (props) => (
    <Bundle load={loadBook}>
        { (Book) => <Book {...props}></Book>}
    </Bundle>
)
const BookListDetail = (props) => (
    <Bundle load={loadBookListDetail}>
        { (BookListDetail) => <BookListDetail {...props}></BookListDetail> }
    </Bundle>
)



class Roots extends Component {

    constructor(props) {
        super(props);
        const docEl = document.body;
        docEl.style.background = '#ffffff';
    }
    componentDidMount(){
        // loadHome(()=>{});  
    }
    render() {
        
        return (
            <div>
                <Header pathname={this.props.location.pathname} />
                <Route path="/" exact component={Home} />
                <Route path="/selection" component={Selection} />
                <Route path="/category" component={Category}></Route>
                <Route path="/bookList" component={BookList}></Route>
                <Route path="/rank" component={Ranking}></Route>
                <Route path="/download" component={Download}></Route>
                <Route path="/book" component={Book}></Route>
                <Route path="/booklistDetail" component={BookListDetail}></Route>
                <Footer></Footer>
            </div>
        );
    }
}

export default Roots;