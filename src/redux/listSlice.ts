import { createSlice, PayloadAction, PayloadActionCreator } from "@reduxjs/toolkit";

const initialState = { list: [] as string[] };

function persistData(newList) {
	localStorage.setItem("todos", JSON.stringify({ todos: newList }));
}

function initialListFn() {
	if (!localStorage) {
		return [];
	}

	let localTodos: string | string[] = localStorage.getItem("todos");
	if (!localTodos) {
		return [];
	}

	localTodos = JSON.parse(localTodos).todos as string[];
	console.log(localTodos);
	return localTodos;
}

export const listSlice = createSlice({
	name: "list-slice",
	initialState,
	reducers: {
		initialList: (state) => {
			state.list = initialListFn();
		},
		setList: (state, action: PayloadAction<string[]>) => {
			const payload = action.payload;
			state.list = payload;
			persistData(state.list);
		},
		addTask: (state, { payload }) => {
			state.list.push(payload);
			persistData(state.list);
		},
		removeTask: (state, { payload }) => {
			state.list.splice(payload, 1);
			persistData(state.list);
		},
	},
});

export const { addTask, removeTask, setList, initialList } = listSlice.actions;

export default listSlice.reducer;
