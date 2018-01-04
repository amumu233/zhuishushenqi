import * as types from '../modules/constants/actionTypes';

const initialState = {
    isLoading: false,
    male: [],
    maleOther: [],
    female: [],
    femaleOther: [],
    error: '',
    chartsDetail: [],
    chartsDetailBooks: [],
    isLoadingDetail: true,
    totalComment: 0
};

export default function ranking(state = initialState, action){
    switch(action.type){
        case types.DISCOVER_CHARTS_LOADING: 
            return {
                ...state,
                isLoading: action.isLoading
            };
        case types.DISCOVER_CHARTS:
            return {
                ...state,
                isLoading: action.isLoading,
                male: action.male,
                maleOther: action.maleOther,
                female: action.female,
                femaleOther: action.femaleOther
            };
        case types.DISCOVER_CHARTS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case types.DISCOVER_CHARTS_DETAIL_LOADING:
            return {
                ...state,
                isLoadingDetail: action.isLoadingDetail
            }
        case types.DISCOVER_CHARTS_DETAIL: 
            return {
                ...state,
                isLoadingDetail: action.isLoadingDetail,
                chartsDetail: action.chartsDetail,
                chartsDetailBooks: action.chartsDetail.books
            }
        case types.DISCOVER_CHARTS_DETAIL_FAILURE: 
            return {
                ...state,
                error: action.error
            }
        default: 
            return state
    }
}