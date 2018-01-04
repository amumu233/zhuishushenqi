import * as types from '../modules/constants/actionTypes';
import * as ConstData from '../modules/constants/ConstData';

const initialState = {
    tags: [],
    bookList: [],
    total: 0,
    detailState: true,
    error: '',
    type: types.DISCOVER_BOOK_LIST_LOADING,
    dataState: ConstData.DATA_EMPTY
};


export default function BookList( state = initialState, action) {
    switch(action.type){
        case types.DISCOVER_BOOK_LIST_DETAIL_LOADING:
            return {
                ...state,
                detailState: action.detailState,
                dataState: ConstData.DATA_LOADING
            };
        case types.DISCOVER_BOOK_LIST_DETAIL:
            return {
                ...state,
                bookList: action.bookList,
                total: action.total,
                detailState: action.detailState,
            };
        case types.DISCOVER_BOOK_LIST_DETAIL_FAILURE:
            return {
                ...state,
                type: types.DISCOVER_BOOK_LIST_FAILURE,
                error: action.error,
                dataState: ConstData.DATA_FAILURE,
            };
        case types.DISCOVER_BOOK_LIST_TAG:
            return {
                ...state,
                tags: action.tags
            };
        default: 
            return state;
    }
}