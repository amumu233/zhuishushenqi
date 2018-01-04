import * as types from '../modules/constants/actionTypes';
import request from '../modules/api/httpUtil';
import api from '../modules/api/api';

// 加载失败
let getFailure = (type,error) => {
    return {
        type: type,
        error: JSON.stringify(error)
    }
}

// -------- 获取精选列表--------------
// 加载成功
let getSelectionSuccess = (home) => {
    return {
        type: types.SELECTION_NODES,
        nodes: home.nodes,
        autoComplete: []
    }
}
// 加载中
let getSelectionLoading = (type, isLoading) => {
    return {
        type: type,
        selectionState: isLoading
    }
}
// 
export let discoverSingleMenuList = () => {
    return dispatch => {
        return request.get(
            api.SELECTION_NODES,
            null,
            (data) => {
                if(data.ok){
                    let selectionData = data.data;
                    dispatch(getSelectionSuccess(selectionData))
                }
            },
            (error) => {
                dispatch(getFailure(types.SELECTION_NODES_FAILURE, error))
            }
        )
    }
}


export let discoverMenuList = () => {
    return dispatch => {
        return request.get(
            api.SELECTION_NODES,
            null,
            (data) => {
                if(data.ok){
                    
                    let selectionData = data.data;
                    dispatch(getSelectionSuccess(selectionData));
                    dispatch(discoverBookDetail(selectionData.nodes[0]._id));
                }
            },
            (error) => {
                dispatch(getFailure(types.SELECTION_NODES, error))
            }
        )
    }
}




// -----获取精选书单 书籍详情 --------
// 获取成功
let getSelectionDetailSuccess = (bookList) => {
    let books = [];
    bookList.forEach(item => {
        books.push(item.book)
    },this); // ?????
    return {
        type: types.SELECTION_NODES_BOOKS,
        bookList: books,
        selectionState: false
    }
}
export let discoverBookDetail = (id) => {
    return dispatch => {
        dispatch(getSelectionLoading(types.SELECTION_NODES_BOOKS_LOADING, true));
        return request.get(
            api.SELECTION_NODES_BOOKS(id),
            null,
            (data) => {
                data.ok ? dispatch(getSelectionDetailSuccess(data.data)) : null;
            },
            (error) => {
                dispatch(getFailure(types.SEARCH_SEARCH_BOOKS_FAILURE, error))
            }
        )
    }
}