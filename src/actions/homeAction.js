import * as types from '../modules/constants/actionTypes';
import request from '../modules/api/httpUtil';
import api from '../modules/api/api';

let getSpreadSuccess = (spreads) => {
    return {
        type: types.HOME_SPREAD,
        spreadData: spreads,
        spreadState: false,
        autoComplete: []
    }
}

export let getSpread = () => {
    return dispatch => {
        return request.get(
            api.WEB_BASE_URL,
            null,
            (data) => {
                data.ok? dispatch(getSpreadSuccess(data.data)) : null;
            },
            (error) => {
                console.log(error)
            }
        )
    }
};