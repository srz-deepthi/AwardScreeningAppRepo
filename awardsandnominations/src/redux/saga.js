import { call,put,takeEvery } from 'redux-saga/effects';
import axios from 'axios';

  export function* watchGetList(){
    // console.log("inside..saga..getList..")
    yield takeEvery('GET_NOMINEES',getNominees);
  }

  export function* watchAddUser(){
    // console.log("inside..saga..postUser..")
    yield takeEvery('ADD_USER',postUser);
  }

  export function* watchUpdateVote(){
    // console.log("inside.. saga... updateVote")
    yield takeEvery('UPDATE_VOTE',updateVote);
  }

  function* getNominees(){
    try{
      const res = yield call(axios.get,"http://localhost:8000/awardslist")
      yield put({type:'GET_NOMINEES_INFO',getInfo : res.data});
    }
    catch (e) { console.log('error....',e) }
  }

  function* postUser(action){
    try{
      // console.log("inside..post user..",action.payload)
      const res = yield call(axios.post,"http://localhost:8000/user",action.payload)
      // console.log("inside postuser...",res);
      yield put({type:'ADD_USER_INFO',postInfo : res.data});
    }
    catch (e) { console.log('error...',e) }
  }

  function* updateVote(action){
    try{
        const udata = action.payload;
        yield call(axios.put,"http://localhost:8000/awardslist/"+udata.id, udata); 
        yield put({type:"GET_NOMINEES"});
      }
      catch (e) { console.log('error',e) }
  }