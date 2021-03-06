import { dataService } from '../services/dataService';

export const GET_TABLE_LIST = 'GET_TABLE_LIST';
export const GET_TABLE_LIST_SUCCESS = 'GET_TABLE_LIST_SUCCESS';
export const GET_TABLE_LIST_FAILURE = 'GET_TABLE_LIST_FAILURE';

export const GET_TABLE_DATA = 'GET_TABLE_DATA';
export const GET_TABLE_DATA_SUCCESS = 'GET_TABLE_DATA_SUCCESS';
export const GET_TABLE_DATA_FAILURE = 'GET_TABLE_DATA_FAILURE';

export const GET_DATASOURCES = 'GET_DATASOURCES';
export const GET_DATASOURCES_SUCCESS = 'GET_DATASOURCES_SUCCESS';
export const GET_DATASOURCES_FAILURE = 'GET_DATASOURCES_FAILURE';

export const GET_DATASOURCE_CONTENT = 'GET_DATASOURCE_CONTENT';
export const GET_DATASOURCE_CONTENT_SUCCESS = 'GET_DATASOURCE_CONTENT_SUCCESS';
export const GET_DATASOURCE_CONTENT_FAILURE = 'GET_DATASOURCE_CONTENT_FAILURE';

export const GET_DRAWERS_SUCCESS = 'GET_DRAWERS_SUCCESS';
export const GET_DRAWERS_FAILURE = 'GET_DRAWERS_FAILURE';

export const GET_COLUMNS_SUCCESS = 'GET_COLUMNS_SUCCESS';
export const GET_COLUMNS_FAILURE = 'GET_COLUMNS_FAILURE';



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

export const getDatasourceContent = () => ({
    type: GET_DATASOURCE_CONTENT,
  })
  
export const getDatasourceContentSuccess = (data) => ({
    type: GET_DATASOURCE_CONTENT_SUCCESS,
    payload: data,
})

export const getDatasourceContentFailure = () => ({
    type: GET_DATASOURCE_CONTENT_FAILURE,
})

export const getDrawersSuccess = (data) => ({
    type: GET_DRAWERS_SUCCESS,
    payload: data
})

export const getDrawersFailure = (data) => ({
    type: GET_DRAWERS_FAILURE
})

export const getColumnsSuccess = (data) => ({
    type: GET_COLUMNS_SUCCESS,
    payload: data
}) 

export const getColumnsFailure = () => ({
    type: GET_COLUMNS_FAILURE
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

export function fetchDatasourceContent(id) {
    return async dispatch => {
        dataService.getDatasourceContent(id)
        .then(
            data => { 
                dispatch(getDatasourceContentSuccess(data));
            },
            error => {
                dispatch(getDatasourceContentFailure());
            }
        );
      }
}

export function createDatasource(connectionId, table, drawer) {
    return async dispatch => {
        dataService.createDatasource(connectionId, table, drawer)
        .then(
            data => { 
                dispatch(fetchTableList(connectionId))
            },
            error => {
                dispatch(getTableListFailure());
            }
        );
    }
}

export function uploadDatasource(formData) {
    return async dispatch => {
        dataService.uploadDatasource(formData)
        .then(
            data => { 
                dispatch(fetchDatasources())
            },
            error => {
                dispatch(getDatasourcesFailure());
            }
        );
    }
}

export function deleteDatasource(id) {
    return async dispatch => {
        dataService.deleteDatasource(id)
        .then(
            data => {
                dispatch(fetchDatasources(data))
            },
            error => {
                dispatch(fetchDatasources())
            }
        )
    }
}

export function fetchDrawers(includeData) {
    return async dispatch => {
        dataService.getDrawers(includeData)
        .then(
            data => { 
                dispatch(getDrawersSuccess(data))
            },
            error => {
                dispatch(getDrawersFailure())
            }
        );
    }
}

export function getColumns(datasetID) {
    return async dispatch => {
        dataService.getColumns(datasetID)
        .then(
            data => { 
                dispatch(getColumnsSuccess(data))
            },
            error => {
                dispatch(getColumnsFailure())
            }
        );
      }
}

export function createDrawer(name) {
    return async dispatch => {
        dataService.createDrawer(name)
        .then(
            data => { 
                dispatch(fetchDrawers(false))
            },
            error => {
                dispatch(getDrawersFailure());
            }
        )
    }
}

export function updateDrawer(drawer) {
    return async dispatch => {
        dataService.updateDrawer(drawer)
        .then(
            data => { 
                dispatch(fetchDrawers(false))
            },
            error => {
                dispatch(getDrawersFailure());
            }
        )
    }
}

export function deleteDrawer(id) {
    return async dispatch => {
        dataService.deleteDrawer(id)
        .then(
            data => { 
                dispatch(fetchDrawers(false))
            },
            error => {
                dispatch(getDrawersFailure());
            }
        )
    }
}