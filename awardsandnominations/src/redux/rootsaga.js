
import { all } from 'redux-saga/effects';
import { watchGetList, watchAddUser, watchUpdateVote } from './saga'; 

export default function * rootSaga(){
  yield all([
    watchGetList(),
    watchAddUser(),
    watchUpdateVote(),
  ])
}