import { dataService } from '../services/dataService';

export const GET_DATA_LIST = 'GET_DATA_LIST'
export const GET_DATA_LIST_SUCCESS = 'GET_DATA_LIST_SUCCESS'
export const GET_DATA_LIST_FAILURE = 'GET_DATA_LIST_FAILURE'

export const GET_DATA = 'GET_DATA'
export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS'
export const GET_DATA_FAILURE = 'GET_DATA_FAILURE'

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

export const getData = () => ({
    type: GET_DATA,
  })
  
export const getDataSuccess = data => ({
    type: GET_DATA_SUCCESS,
    payload: data,
})

export const getDataFailure = () => ({
    type: GET_DATA_FAILURE,
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

export function fetchData(connectionId, table) {
    return async dispatch => {
      dispatch(getData())
  
      dataService.getData(connectionId, table)
      .then(
          data => { 
              dispatch(getDataSuccess(data));
          },
          error => {
              dispatch(getDataFailure());
          }
      );
    }
  }