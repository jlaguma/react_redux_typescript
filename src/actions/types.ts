import { FetchTodoAction, DeleteTodoAction } from './todos';

export enum ActionTypes {
    fetchTodos,
    deleteTodo,
}

export type Action = FetchTodoAction | DeleteTodoAction;
