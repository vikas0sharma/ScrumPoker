import { BoardState, CreateBoardAction, CREATE_BOARD } from './actions';

const initialState: BoardState = {
  boardId: '',
  userId: '',
  isAdmin: false,
  point: 0,
};

export const createBoardReducer = (
  state = initialState,
  action: CreateBoardAction,
): BoardState => {
  debugger;
  switch (action.type) {
    case CREATE_BOARD: {
      return {
        boardId: action.payload.boardId,
        userId: action.payload.userId,
        isAdmin: action.payload.isAdmin,
        point: action.payload.point,
      };
    }
    default:
      return state;
  }
};
