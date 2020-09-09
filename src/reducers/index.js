import { combineReducers } from 'redux';
import OKRReducer from '../components/OKR/OKRReducer';

export default combineReducers({
    okr: OKRReducer
});