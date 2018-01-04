import * as types from '../modules/constants/actionTypes';
import request from '../modules/api/httpUtil';
import api from '../modules/api/api';


// ------------- 获取书籍详情---------------------
// 获取中
let getBookDetailLoading = (type, isLoading) => {
    return {
        type: type,
        isLoadingDetail: isLoading
    }
}
//获取成功
let getBookDetailSuccess = (data) => {
    return {
        type: types.BOOK_DETAIL,
        bookDetail: data,
        isLoadingDetail: false
    }
};
// 加载失败
let getFailure = (type, error)  => {
    return {
        type,
        error: JSON.stringify(error)
    }
}
export let bookDetail = (bookId) => {
    return dispatch => {
        dispatch(getBookDetailLoading(types.BOOK_DETAIL_LOADING, true));
        return request.get(
            api.BOOK_DETAIL(bookId),
            null,
            (data) => {
                data? dispatch(getBookDetailSuccess(data)): dispatch(getBookDetailSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_DETAI_FAILURE, error))
            }
        )
    }
}


// ------------- 获取书籍热门评论--------------
let getBookHotReviewSuccess = (data) => {
    return {
        type: types.BOOK_HOT_REVIEW,
        bookCommentList: data
    }
}
export let bookHotReview = (bookId) => {
    return dispatch => {
        return request.get(
            api.BOOK_HOT_REVIEW(bookId),
            null,
            (data) => {
                data.ok? dispatch(getBookHotReviewSuccess(data.reviews)): dispatch(getBookHotReviewSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_HOT_REVIEW, error))
            }
        )
    }
}

//-------------根据id获取推荐书单
let getRecommendBookListSuccess = (data) => {
    return {
        type: types.BOOK_RECOMMEND_BOOK_LIST,
        bookRecommendList: data
    }
}
export let recommendBookList = (bookId) => {
    return dispatch => {
        return request.get(
            api.BOOK_RECOMMEND_BOOK_LIST(bookId),
            null,
            (data) => {
                data.ok? dispatch(getRecommendBookListSuccess(data.booklists)):dispatch(getRecommendBookListSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.BOOK_RECOMMEND_BOOK_LIST, error))
            }
        )
    }
}
