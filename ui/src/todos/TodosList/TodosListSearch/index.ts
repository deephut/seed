import {TodosListSearchComponent} from './TodosListSearchComponent';
import {TodosListSearchComponentProps} from './TodosListSearchComponentProps';
import {todosSearchStore} from './TodosListSearchStore';
import {withObservable} from 'lib/withObservable';
import combineLatestObj from 'lib/combineLatestObj';

export const TodosListSearchObservable = combineLatestObj<TodosListSearchComponentProps>({
	searchText: todosSearchStore.searchText$,
	setSearchText: todosSearchStore.setSearchText
});

export const TodosListSearch = withObservable<TodosListSearchComponentProps>(TodosListSearchObservable)(TodosListSearchComponent);
