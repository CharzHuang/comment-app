import express from 'express'

import serverRenderer from './renderer'
import configureStore from '../src/store/configureStore'
import { addComment } from '../src/store/reducers/comments'

const router = express.Router()
const path = require('path')

const serverSideComment = {
  userName: 'Jason',
  content: '<h1>This comment is from server side.</h1>'
}

const actionIndex = (req, res, next) => {
    const store = configureStore()

    store.dispatch(addComment(serverSideComment))
    serverRenderer(store)(req, res, next)
}

// root (/) should always serve our server rendered page
router.use('^/$', actionIndex)

// other static resources should just be served as they are
router.use(express.static(
    path.resolve(__dirname, '..', 'build'),
    { maxAge: '30d' },
))

export default router