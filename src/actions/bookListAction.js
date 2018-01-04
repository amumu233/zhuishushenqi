import * as types from '../modules/constants/actionTypes';
import request from '../modules/api/httpUtil';
import api from '../modules/api/api';

// ------------ 获取书单标签-------------------
// 获取成功
let getBookListTagSuccess = (data) => {
    let gender = {
        "name": "性别",
        "tags": ["男性","女性"]
    };
    data.unshift(gender);
    data.unshift({"name": "全部", tags: []});
    return {
        type: types.DISCOVER_BOOK_LIST_TAG,
        tags: data
    }
};
export let discoverBookListTag = () => {
    return dispatch => {
        return request.get(
            api.DISCOVER_BOOK_LIST_TAG,
            null,
            (data) => {
                if(data.ok) {
                    let tagData = data.data;
                    dispatch(getBookListTagSuccess(tagData));
                    dispatch(discoverBookListDetail("?duration=last-seven-days&sort=collectorCount"))
                }
            },
            (error) => {
                console.log('获取书单标签失败',error)
            }
        )
    }
};

let getBookListLoading = (type, isLoading) => {
    return {
        type: type,
        detailState: isLoading
    }
};


//-------------- 获取书单详情 ------------------
// 获取成功
let getBookListDetailSuccess = (data) => {
    return {
        type: types.DISCOVER_BOOK_LIST_DETAIL,
        bookList: data.bookLists,
        total: data.total,
        detailState: false
    }
};
// 加载失败
let getFailure = ( type, error ) => {
    return {
        type: type,
        error: JSON.stringify(error)
    }
};
export let discoverBookListDetail = (params) => {
    return dispatch => {
        dispatch(getBookListLoading(types.DISCOVER_BOOK_LIST_DETAIL_LOADING, true));
        return request.get(
            api.DISCOVER_BOOK_LIST + params,
            null,
            (data) => {
                data.ok? dispatch(getBookListDetailSuccess(data)): null;
            },
            (error) => {
                dispatch(getFailure(types.DISCOVER_BOOK_LIST_DETAIL_FAILURE, error))
            }
        )
    }
}
