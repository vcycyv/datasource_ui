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

export function fetchDataList() {
    return async dispatch => {
      dispatch(getDataList())
  
      try {
        const response = await fetch('http://localhost:8000/datasource')
        const data = await response.json()
  
        dispatch(getDataListSuccess(data))
      } catch (error) {
        dispatch(getDataListFailure())
      }
    }
  }