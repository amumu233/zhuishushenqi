import * as types from '../modules/constants/actionTypes';
import request from '../modules/api/httpUtil';
import api from '../modules/api/api';


// ------- 排行榜--------
// 加载成功
let getRankingSuccess = (data) => {
    let male = [], maleOther = [], female = [], femaleOther = [];
    data.male.forEach(element => {
        if(element.collapse){
            maleOther.push(element)
        }else{
            male.push(element)
        }
    }, this);
    data.female.forEach(element => {
        if(element.collapse){
            femaleOther.push(element);
        } else {
            female.push(element)
        }
    });
    return {
        type: types.DISCOVER_CHARTS,
        male,
        maleOther,
        female,
        femaleOther,
        idLoading: false
    }
};
// 加载中
let getRankingLoading = (type, isLoading) => {
    return {
        type,
        isLoading
    }
}
// 加载失败
let getFailure = (type, error) => {
    return {
        type,
        error: JSON.stringify(error)
    }
};
export let ranking = () => {
    return dispatch => {
        dispatch(getRankingLoading(types.DISCOVER_CHARTS_LOADING, true));
        return request.get(
            api.DISCOVER_CHARTS,
            null,
            (data) => {
                data.ok? dispatch(getRankingSuccess(data)) : dispatch(getRankingSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.DISCOVER_CHARTS_FAILURE, error))
            }
        )
    }
};


// ------------ 排行榜详情 ---------------
// 加载成功
let getRankingDetailSuccess = (data) => {
    return {
        type: types.DISCOVER_CHARTS_DETAIL,
        isLoadingDetail: false,
        chartsDetail: data
    }
};
// 加载中
let getRankingDetailLoading = (type, isLoading) => {
    return {
        type: type,
        isLoadingDetail: isLoading
    }
};
export let rankingList = (id) => {
    return dispatch => {
        dispatch(getRankingDetailLoading(types.DISCOVER_CHARTS_DETAIL_LOADING, true));
        return request.get(
            api.DISCOVER_CHARTS_DETAIL(id),
            null,
            (data) => {
                data.ok? dispatch(getRankingDetailSuccess(data.ranking)): dispatch(getRankingDetailSuccess(null))
            },
            (error) => {
                dispatch(getFailure(types.DISCOVER_CHARTS_DETAIL_FAILURE, error));
            }
        )
    }
}


    