import {createStore} from 'redux';
import rootReducer from './fileReducerIndex';

const store = createStore(rootReducer);

export default store;