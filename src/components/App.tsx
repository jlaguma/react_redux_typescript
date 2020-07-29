import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

// this is how we deal with Class based components in TypeScript
// We define interfaces that defines the structure of props,
// then we apply it below.
interface AppProps {
    todos: Todo[];
    // fetchTodos: typeof fetchTodos; // like this does not work, because thunk does not play well with TS
    fetchTodos: Function;
    deleteTodo: typeof deleteTodo;
}

interface AppState {
    fetching: boolean;
}

// Functional Component way of doing things:
// const App: React.FC<AppProps> = (props): JSX.Element => {
//     const [counter, setCounter] = useState(1);

//     const onIncrement = (): void => {
//         setCounter(counter + 1);
//     };

//     const onDecrement = (): void => {
//         setCounter(counter - 1);
//     };

//     return (
//         <div>
//             <button onClick={onIncrement}>Increment</button>
//             <button onClick={onDecrement}>Decrement</button>
//             {counter}
//         </div>
//     );
// };

class _App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);

        this.state = { fetching: false };
    }

    componentDidUpdate(prevProps: AppProps): void {
        if (!prevProps.todos.length && this.props.todos.length) {
            this.setState({ fetching: false });
        }
    }

    onButtonClick = (e: React.MouseEvent): void => {
        e.preventDefault();
        this.props.fetchTodos();
        this.setState({ fetching: true });
    };

    onTodoClick = (e: React.MouseEvent, id: number): void => {
        e.preventDefault();
        this.props.deleteTodo(id);
    };

    renderList = (): JSX.Element[] => {
        return this.props.todos.map((todo: Todo, index: number) => {
            return (
                <li key={index} onClick={(e) => this.onTodoClick(e, todo.id)}>
                    {todo.title}
                </li>
            );
        });
    };

    render() {
        return (
            <div>
                <button onClick={(e) => this.onButtonClick(e)}>Fetch</button>
                {this.state.fetching ? 'Loading...' : null}
                <ul>{this.renderList()}</ul>
            </div>
        );
    }
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => {
    return {
        todos: state.todos,
    };
};

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
