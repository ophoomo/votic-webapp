import { combineReducers, createStore } from 'redux';
import { authReducer } from './reducers/authReducer';

const rootReducer = combineReducers({
    authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const configureStore = () => {
    const store = createStore(rootReducer);
    return store;
}

export default configureStore;