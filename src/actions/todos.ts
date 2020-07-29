import { Dispatch } from 'redux';
import axios from 'axios';
import { ActionTypes } from './types';

const url = 'https://jsonplaceholder.typicode.com/todos';

export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface FetchTodoAction {
    type: ActionTypes.fetchTodos;
    payload: Todo[];
}

export interface DeleteTodoAction {
    type: ActionTypes.deleteTodo;
    payload: number;
}

export const fetchTodos = () => {
    return async (dispatch: Dispatch<FetchTodoAction>) => {
        const response = await axios.get<Todo[]>(url);

        dispatch({
            type: ActionTypes.fetchTodos,
            payload: response.data,
        });
    };
};

export const deleteTodo = (id: number): DeleteTodoAction => {
    return {
        type: ActionTypes.deleteTodo,
        payload: id,
    };
};
