export const CREATE_BOARD = 'CREATE_BOARD';

export const createBoard = (boardDetails: BoardState): CreateBoardAction => ({
  type: CREATE_BOARD,
  payload: boardDetails,
});

export interface CreateBoardAction {
  type: typeof CREATE_BOARD;
  payload: BoardState;
}

export interface BoardState {
  boardId: string;
  userId: string;
  point: number;
  isAdmin: boolean;
}
