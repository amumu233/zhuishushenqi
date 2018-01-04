import * as types from '../modules/constants/actionTypes';
import * as ConstData from '../modules/constants//ConstData';

const initialState = {
    bookDetail: {},
    bookChapterList: [],
    totalChapter: 0,
    bookRecommendList: [],
    totalComment: 0,
    bookCommentList: [],
    isLoadingDetail: false,
    error: '',
    type: types.BOOK_DETAIL
}

export default function book( state = initialState, action){

    switch(action.type){
        case types.BOOK_DETAIL_LOADING:
            return {
                ...state,
                isLoadingDetail: action.isLoadingDetail
            }
        case types.BOOK_DETAIL:
            return {
                ...state,
                isLoadingDetail: action.isLoadingDetail,
                bookDetail: action.bookDetail
            }
        case types.BOOK_DETAI_FAILURE:
            return {
                ...state,
                error: action.error,
                type: types.BOOK_DETAI_FAILURE
            }
        case types.BOOK_HOT_REVIEW:
            return {
                ...state,
                bookCommentList: action.bookCommentList,
                totalComment: action.bookCommentList.length
            }
        case types.BOOK_RECOMMEND_BOOK_LIST:
            return {
                ...state,
                bookRecommendList: action.bookRecommendList,
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