import * as styles from './TodosListComponent.scss';
import * as React from 'react';
import {TodosListComponentProps} from './TodosListComponentProps';
import {FormEventHandler} from 'react';
import {TodosListSearch} from './TodosListSearch';
import {TodoEntity} from 'service-entities/todos';

interface TodosListState {
	todoText: string;
}

export class TodosListComponent extends React.PureComponent<TodosListComponentProps, TodosListState> {
	state = {
		todoText: ''
	};

	render() {
		const {todos} = this.props;

		return (
			<div>
				<h2>Todos RxJS</h2>
				<button onClick={this.addTodo}>add</button>
				<input type='text' value={this.state.todoText} onChange={this.updateTodoText}/>
				<TodosListSearch/>
				<ol className={styles.list}>
					{todos.map((todo: TodoEntity) => <li key={todo.id}>{todo.text}</li>)}
				</ol>
			</div>
		);
	}

	componentDidMount() {
		this.props.refresh();
	}

	updateTodoText: FormEventHandler<HTMLInputElement> = e => this.setState({todoText: e.currentTarget.value});

	addTodo = () => {
		if (this.state.todoText.length) {
			this.props.addTodo({text: this.state.todoText});
			this.setState({todoText: ''});
		}
	};
}
