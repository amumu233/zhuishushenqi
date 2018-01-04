import { combineReducers } from "redux";

import home from './homeReducer';
import category from './categoryReducer';
import ranking from './rankingReducer';
import selection from './selectionReducer';
import bookList from './bookListReducer';
import book from './bookReducer';
import read from './readReducer';
import bookListDetail from './bookListDetailReducer';

const rootReducer = combineReducers({
    home,
    category,
    ranking,
    selection,
    bookList,
    book,
    read,
    bookListDetail
})

export default rootReducer;