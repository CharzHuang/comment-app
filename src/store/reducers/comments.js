const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'

export default function (state, action) {
  if (!state || !state.comments) {
    state = {
      comments: []
    }
  }
  switch (action.type) {
    case ADD_COMMENT:
      return {
        comments: [...state.comments, action.payload]
      }
    case DELETE_COMMENT:
      return {
        comments: [
          ...state.comments.slice(0, action.payload),
          ...state.comments.slice(action.payload + 1)
        ]
      }
    default:
      return state
  }
}

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment
  }
}

export const deleteComment = (index) => {
  return {
    type: DELETE_COMMENT,
    payload: index
  }
}