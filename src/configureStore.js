import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { getInstance } from 'd2';
import {fetchCustomDashboardsConfig, fetchCustomDashboardsConfigFailure,fetchEvents,fetchEventsFailure} from "./actions/dashboards";

export const fetchCustomDashboards=()=>{
    return function (dispatch) {
        getInstance()
            .then(d2 => {
                const api = d2.Api.getApi() // Returns the Api singleton.
                api.get('/dataStore/chart-studio/dashboards').then(results=>{
                    dispatch(fetchCustomDashboardsConfig(results))
                }).catch(error => {
                    dispatch(fetchCustomDashboardsConfigFailure(error))
                });

            });
    }
}

export const fetchEventsConfig=()=>{
    return function (dispatch) {
        fetch('/config/dhisevents.json').then(response=>response.json()).then(results=>{
            dispatch(fetchEvents(results))
        }).catch(error => {
            dispatch(fetchEventsFailure(error))
        });
    }
}

const configureStore = () => {
    const middleware = [thunk];

    // Enable Redux devtools if extension is installed instead of redux-logger
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    if (
        !window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
        process.env.NODE_ENV !== 'production'
    ) {
        middleware.push(createLogger());
    }

    return createStore(
        reducer,
        composeEnhancers(applyMiddleware(...middleware))
    );
};
configureStore().dispatch(fetchEventsConfig())

export default configureStore;
