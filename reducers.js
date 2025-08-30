import todosStorage from './util/storage.js';

const init = {
    todos: todosStorage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: (todo) => !todo.completed,
        completed: (todo) => todo.completed,
    },
    isEditing: null,
};

const actions = {
    add({ todos }, title) {
        // todos trỏ đến (reference) todos trong state
        if (title) {
            todos.push({ title, completed: false });
            todosStorage.set(todos);
        }
    },
    completed({ todos }, index) {
        const todo = todos[index];
        todo.completed = !todo.completed;
        todosStorage.set(todos);
    },
    completedAll({ todos }, isChecked) {
        todos.forEach((todo) => (todo.completed = isChecked));
        todosStorage.set(todos);
    },

    delete({ todos }, index) {
        todos.splice(index, 1);
        todosStorage.set(todos);
    },

    editing(state, index) {
        state.isEditing = index;
    },

    confirmEditing(state, index, title) {
        if (state.isEditing !== null) {
            title ? (state.todos[index].title = title) : state.todos.splice(index, 1);
            state.isEditing = null;
            todosStorage.set(state.todos);
        }
    },
    cancelEditing(state) {
        state.isEditing = null;
    },
    clearCompleted({ todos }) {
        todos.forEach((todo) => (todo.completed = false));
        todosStorage.set(todos);
    },
    filter(state, stage) {
        state.filter = stage;
    },
    clearCompleted(state) {
        state.todos = state.todos.filter(state.filters.active);
        todosStorage.set(state.todos);
    },
};

export default function reducers(state = init, action, args) {
    actions[action]?.(state, ...args);
    return state;
}
