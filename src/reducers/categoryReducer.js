import * as types from '../modules/constants/actionTypes';
import * as ConstData from '../modules/constants/ConstData';

const initialState = {
    tags: {},
    tagsV2: {},
    bookList: [],
    total: 0,
    booksState: false,
    error: '',
    type: types.DISCOVER_CATEGORY_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

export default function category ( state = initialState, action){
    switch(action.type){
        case types.DISCOVER_CATEGORY_BOOKS_LOADING:
            return {
                ...state,
                dataState: ConstData.DATA_LOADING,
                booksState: action.booksState
            }
        case types.DISCOVER_CATEGORY_BOOKS: 
            return {
                ...state,
                dataState: ConstData.DATA_SUCCESS,
                booksState: action.booksState,
                bookList: action.bookList,
                total: action.total
            }
        case types.DISCOVER_CATEGORY_BOOKS_FAILURE:
            return {
                ...state,
                error: action.error,
                dataState: ConstData.DATA_FAILURE
            }
        case types.DISCOVER_CATEGORY_LIST:
            return {
                ...state,
                tags: action.tags
            }
        case types.DISCOVER_CATEGORY_LIST_V2:
            return {
                ...state,
                tagsV2: action.tagsV2
            }
        default:
            return state;
    }
}