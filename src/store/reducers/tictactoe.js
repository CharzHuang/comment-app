const GAME_STEP = "GAME_STEP";
const JUMP_TO = "JUMP_TO";

const initialState = {
  history: [
    {
      squares: []
    }
  ],
  step: 0,
  xIsNext: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GAME_STEP: {
      const newHistory = action.payload;
      return {
        history: newHistory,
        step: newHistory.length - 1,
        xIsNext: !state.xIsNext
      };
    }
    case JUMP_TO: {
      const step = action.payload;
      return {
        ...state,
        step,
        xIsNext: step % 2 === 0
      };
    }
    default:
      return state;
  }
};

export const newGameStep = newHistory => {
  return {
    type: GAME_STEP,
    payload: newHistory
  };
};

export const jumpTo = step => {
  return {
    type: JUMP_TO,
    payload: step
  };
};
