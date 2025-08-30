import html from '../core.js';

function TodoItem({ todo, index, isEditing }) {
    return html`
        <li class="${todo.completed && 'completed'} ${isEditing === index && 'editing'}">
            <div class="view">
                <input
                    oninput="dispatch('completed', ${index})"
                    class="toggle"
                    type="checkbox"
                    ${todo.completed && 'checked'}
                />
                <label ondblclick="dispatch('editing', ${index})">${todo.title}</label>
                <button onclick="dispatch('delete', ${index})" class="destroy"></button>
            </div>
            <input
                onblur="dispatch('confirmEditing', ${index}, this.value.trim())"
                onkeyup="event.keyCode === 13 &&  dispatch('confirmEditing', ${index}, this.value.trim()) || event.keyCode === 27 && dispatch('cancelEditing')"
                class="edit"
                value="${todo.title}"
            />
        </li>
    `;
}

export default TodoItem;
