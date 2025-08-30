import html from '../core.js';
import { connect } from '../store.js';
function Footer({ todos, filters, filter }) {
    return html`
        <footer class="footer">
            <span class="todo-count"
                ><strong>${todos.reduce((acc, todo) => (filters.active(todo) ? ++acc : acc), 0)}</strong> item
                left</span
            >
            <ul class="filters">
                ${Object.keys(filters).map((type) => {
                    return html` <li>
                        <a onclick="dispatch('filter','${type}')" class="${filter === type && 'selected'}" href="#!"
                            >${type[0].toUpperCase() + type.slice(1)}</a
                        >
                    </li>`;
                })}
            </ul>
            ${todos.some((todo) => filters.completed(todo)) &&
            html`<button class="clear-completed" onclick="dispatch('clearCompleted', this) onclick="dispatch('clearCompleted')"">Clear completed</button>`}
        </footer>
    `;
}
export default connect()(Footer);
