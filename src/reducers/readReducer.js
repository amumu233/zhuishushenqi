import * as types from '../modules/constants/actionTypes';
import * as ConstData from '../modules/constants/ConstData';

const initialState = {
    bookChapterList: [],
    chapterDetail: {},
    chapterNum: 0,
    totalChapter: 0,
    isLoadingDetail: false,
    chapterTitle: '',
    error: '',
    type: types.BOOK_DETAIL,
    dataState: ConstData.DATA_EMPTY
}

export default function read( state=initialState, action) {
    switch(action.type){
        case types.READ_BOOK_CHAPTER_DETAIL_LOADING:
            return {
                ...state,
                isLoadingDetail: action.isLoadingDetail,
                dataState: ConstData.DATA_LOADING
            }
        case types.READ_BOOK_CHAPTER_DETAIL_FAILURE:
            return {
                ...state,
                error: action.error,
                dataState: ConstData.DATA_FAILURE
            }
        case types.READ_BOOK_CHAPTER_DETAIL:
            return {
                ...state,
                isLoadingDetail: action.isLoadingDetail,
                dataState: ConstData.DATA_SUCCESS,
                chapterDetail: action.chapterDetail,
                chapterNum: action.chapterNum,
                chapterTitle: action.chapterTitle
            }
        case types.READ_BOOK_CHAPTER_LIST:
            return {
                ...state,
                bookChapterList: action.bookChapterList,
                totalChapter: action.bookChapterList.length
            }
        default: 
            return state
    }
}