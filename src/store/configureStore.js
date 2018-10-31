import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux'

import ReduxThunk from 'redux-thunk'

import commentsReducer from './reducers/comments'

const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk))(createStore)

export default function configureStore(initialState = {}) {
  return createStoreWithMiddleware(commentsReducer, initialState)
}