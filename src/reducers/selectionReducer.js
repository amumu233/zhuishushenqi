import * as types from '../modules/constants/actionTypes';
import * as ConstData from '../modules/constants/ConstData';

const initialState = {
    nodes: [],
    bookList: [],
    total: [],
    selectionState: false,
    error: '',
    type: types.SELECTION_NODES_BOOKS_LOADING,
    dataState: ConstData.DATA_EMPTY
};

export default function selection( state = initialState, action) {
    switch(action.type){
        case types.SELECTION_NODES_BOOKS_LOADING:
            return {
                ...state,
                selectionState: action.selectionState,
                dataState: ConstData.DATA_LOADING
            }
        case types.SELECTION_NODES_BOOKS:
            return {
                ...state,
                bookList: action.bookList,
                total: action.bookList.length,
                selectionState: action.selectionState
            }
        case types.SELECTION_NODES_BOOKS_FAILURE:
            return {
                ...state,
                dataState: ConstData.DATA_FAILURE,
                type: types.SELECTION_NODES_BOOKS_FAILURE,
                error: action.error
            }
        case types.SELECTION_NODES:
            return {
                ...state,
                nodes: action.nodes
            }
        default: 
            return state;
    }
}