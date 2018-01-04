import * as types from '../modules/constants/actionTypes';
import * as ConstData from '../modules/constants/ConstData';


const initialState = {
    books: [],
    total: 0,
    title: '',
    detailState: false,
    error: '',
    type: types.DISCOVER_BOOK_LIST_DETAIL,
    dataState: ConstData.DATA_EMPTY
}

export default function bookListDetail( state=initialState, action){
    switch(action.type){
        case types.DISCOVER_BOOK_LIST_DETAIL_LOADING: 
            return {
                ...state,
                detailState: action.detailState,
                type: types.DISCOVER_BOOK_LIST_DETAIL_LOADING,
                dataState: ConstData.DATA_LOADING
            }
        case types.DISCOVER_BOOK_LIST_DETAIL_FAILURE:
            return {
                ...state,
                error: action.error,
                type: types.DISCOVER_BOOK_LIST_DETAIL_FAILURE,
                dataState: ConstData.DATA_FAILURE
            }
        case types.DISCOVER_BOOK_LIST_DETAIL:
            return {
                ...state,
                books: action.books,
                total: action.bookList.total,
                title: action.bookList.title,
                detailState: action.detailState
            }
        default:
            return state;
    }
}