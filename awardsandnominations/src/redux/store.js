import { createStore, applyMiddleware } from 'redux'
import Reducer from './reducer'
import createSagaMiddleware from '@redux-saga/core'
import rootSaga from './rootsaga'

const sagaMiddleware = createSagaMiddleware()

const Store = createStore(
    Reducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default Store