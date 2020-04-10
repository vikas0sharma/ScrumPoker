import { Board } from '../models/board';
import { UserModel } from '../models/user-model';

export const createBoard = async (board: Board): Promise<string> => {
  const result = await apiFetchUpdate(`${scrumPokerURL}/boards`, board);
  return result as string;
};

export const createUser = async (
  boardId: string,
  user: UserModel,
): Promise<string> => {
  const result = await apiFetchUpdate(
    `${scrumPokerURL}/boards/${boardId}/users`,
    user,
  );
  return result as string;
};

export const updateUserPoint = async (
  boardId: string,
  user: UserModel,
): Promise<boolean> => {
  const result = await apiFetchUpdate(
    `${scrumPokerURL}/boards/${boardId}/users`,
    user,
    'PUT',
  );
  return result as boolean;
};

export const getBoardUsers = async (boardId: string): Promise<UserModel[]> => {
  const result = await apiFetchGET(`${scrumPokerURL}/boards/${boardId}/users`);
  return result;
};

export const getUser = async (
  boardId: string,
  userId: string,
): Promise<UserModel> => {
  const result = apiFetchGET(
    `${scrumPokerURL}/boards/${boardId}/users/${userId}`,
  );
  return result;
};

export const clearUsersPoint = async (boardId: string) => {
  const result = apiFetchUpdate(`${scrumPokerURL}/boards/${boardId}`, null);
  return result;
};

const apiFetchUpdate = async (
  url: string,
  body: any,
  method: string = 'POST',
): Promise<any> => {
  debugger;
  const response = await fetch(url, {
    method: method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(body), // body data type must match "Content-Type" header
  });

  return await response.json();
};
export const baseURL = 'https://agile-scrum-poker.herokuapp.com';
const scrumPokerURL = baseURL + '/scrum-poker';

const apiFetchGET = async (url: string): Promise<any> => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
  });

  return await response.json();
};
