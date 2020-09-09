import { modelService } from '../services/modelService';

export const GET_MODELS_SUCCESS = 'GET_MODELS_SUCCESS';
export const GET_MODELS_FAILURE = 'GET_MODELS_FAILURE';

export const getModelsSuccess = (data) => ({
    type: GET_MODELS_SUCCESS,
    payload: data
}) 

export const getModelssFailure = () => ({
    type: GET_MODELS_FAILURE
}) 

export function fetchModels() {
    return async dispatch => {
        modelService.getModels()
        .then(
            data => { 
                dispatch(getModelsSuccess(data))
            },
            error => {
                dispatch(getModelssFailure())
            }
        );
    }
}

export function buildModel(modelRequest) {
    return async dispatch => {
        modelService.buildModel(modelRequest)
        .then(
            data => { 
                dispatch(getModelsSuccess(data))
            },
            error => {
                dispatch(getModelssFailure())
            }
        )
    }
}

export function updateModel(model) {
    return async dispatch => {
        modelService.updateModel(model)
        .then(
            data => { 
                dispatch(fetchModels())
            },
            error => {
                dispatch(getModelssFailure())
            }
        )
    }
}

export function deleteModel(id) {
    return async dispatch => {
        modelService.deleteModel(id)
        .then(
            data => { 
                dispatch(fetchModels())
            },
            error => {
                dispatch(getModelssFailure())
            }
        )
    }
}