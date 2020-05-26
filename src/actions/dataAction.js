import { dataService } from '../services/dataService';

export const GET_TABLE_LIST = 'GET_TABLE_LIST'
export const GET_TABLE_LIST_SUCCESS = 'GET_TABLE_LIST_SUCCESS'
export const GET_TABLE_LIST_FAILURE = 'GET_TABLE_LIST_FAILURE'

export const GET_TABLE_DATA = 'GET_TABLE_DATA'
export const GET_TABLE_DATA_SUCCESS = 'GET_TABLE_DATA_SUCCESS'
export const GET_TABLE_DATA_FAILURE = 'GET_TABLE_DATA_FAILURE'

export const GET_DATASOURCES = 'GGET_DATASOURCES'
export const GET_DATASOURCES_SUCCESS = 'GET_DATASOURCES_SUCCESS'
export const GET_DATASOURCES_FAILURE = 'GET_DATASOURCES_FAILURE'

export const getTableList = () => ({
    type: GET_TABLE_LIST,
  })
  
export const getTableListSuccess = tableList => ({
    type: GET_TABLE_LIST_SUCCESS,
    payload: tableList,
})

export const getTableListFailure = () => ({
    type: GET_TABLE_LIST_FAILURE,
})

export const getTableData = () => ({
    type: GET_TABLE_DATA,
  })
  
export const getTableDataSuccess = data => ({
    type: GET_TABLE_DATA_SUCCESS,
    payload: data,
})

export const getTableDataFailure = () => ({
    type: GET_TABLE_DATA_FAILURE,
})

export const getDatasourcesSuccess = (data) => ({
    type: GET_DATASOURCES_SUCCESS,
    payload: data
})

export const getDatasourcesFailure = (data) => ({
    type: GET_DATASOURCES_FAILURE
})

export function fetchTableList(id) {
    return async dispatch => {
      dispatch(getTableList())
  
      dataService.getTableList(id)
      .then(
          data => { 
              dispatch(getTableListSuccess(data));
          },
          error => {
              dispatch(getTableListFailure());
          }
      );
    }
  }

export function fetchTableData(connectionId, table) {
    return async dispatch => {
      dispatch(getTableData())
  
      dataService.getTableData(connectionId, table)
      .then(
          data => { 
              dispatch(getTableDataSuccess(data));
          },
          error => {
              dispatch(getTableDataFailure());
          }
      );
    }
  }

export function fetchDatasources() {
    return async dispatch => {
        dataService.getDatasources()
        .then(
            data => { 
                dispatch(getDatasourcesSuccess(data));
            },
            error => {
                dispatch(getDatasourcesFailure());
            }
        );
      }
}