import { useEffect, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { addTask, initialList, removeTask } from "./redux/listSlice";
import { useAppDispatch, useAppSelector } from "./redux/store";

function App() {
	const [todoValue, setTodoValue] = useState("");
	const todos = useAppSelector((state) => state.list.list);
	const dispatch = useAppDispatch();

	function handleAddTodos(newTodo) {
		dispatch(addTask(newTodo));
	}

	function handleDeleteTodo(index) {
		dispatch(removeTask(index));
	}

	function handleEditTodo(index) {
		const valueToBeEdited = todos[index];
		setTodoValue(valueToBeEdited);
		dispatch(removeTask(index));
	}

	useEffect(() => {
		dispatch(initialList());
	}, []);

	return (
		<>
			<TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
			<TodoList handleEditTodo={handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos={todos} />
		</>
	);
}

export default App;
