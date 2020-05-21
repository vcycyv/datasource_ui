import { dataService } from '../services/dataService';

export const GET_DATA_LIST = 'GET DATA LIST'
export const GET_DATA_LIST_SUCCESS = 'GET_DATA_LIST_SUCCESS'
export const GET_DATA_LIST_FAILURE = 'GET_DATA_LIST_FAILURE'

export const getDataList = () => ({
    type: GET_DATA_LIST,
  })
  
export const getDataListSuccess = dataList => ({
    type: GET_DATA_LIST_SUCCESS,
    payload: dataList,
})

export const getDataListFailure = () => ({
    type: GET_DATA_LIST_FAILURE,
})

export function fetchDataList(id) {
    return async dispatch => {
      dispatch(getDataList())
  
      dataService.getDataList(id)
      .then(
          data => { 
              dispatch(getDataListSuccess(data));
          },
          error => {
              dispatch(getDataListFailure());
          }
      );
    }
  }