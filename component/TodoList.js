import html from '../core.js';
import { connect } from '../store.js';
import TodoItem from './Todoitem.js';

function TodoList({ todos, filters, isEditing, filter }) {
    return html`
        <section class="main">
            <input
                id="toggle-all"
                class="toggle-all "
                type="checkbox"
                oninput="dispatch('completedAll', this.checked)"
                ${todos.every((todo) => filters.completed(todo)) && 'checked'}
            />
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list">
                ${todos.map((todo, index) => {
                    if (filters[filter](todo)) return TodoItem({ todo, index, isEditing });
                })}
            </ul>
        </section>
    `;
}
export default connect()(TodoList);
