export default function html([first, ...strings], ...values) {
    return values
        .reduce((acc, val) => acc.concat(val, strings.shift()), [first])
        .filter((x) => (x && x !== true) || x === 0)
        .join('');
}
export function createStore(reducer) {
    // dữ liệu trong store gọi là state
    let state = reducer();
    // 1 Map chứa key là một root element và giá trị của nó là một component
    const roots = new Map();
    // hàm này render component ra giao diện tương ứng với root của nó
    function render() {
        for (let [root, component] of roots) {
            // component là một hàm return về html, hiểu đơn giản là vậy
            const exComponent = component();
            root.innerHTML = exComponent;
        }
    }
    return {
        // attach root và component khi lần đầu chạy
        attach(component, root) {
            roots.set(root, component);
            render();
        },
        // lấy dữ liệu tương ứng với view
        connect(selector = (state) => state) {
            return (component) =>
                (props, ...args) =>
                    //  gọi hàm component khi, truyền vào đối số là một object
                    component(Object.assign({}, selector(state), props, ...args));
        },
        dispatch(action, ...args) {
            // cập nhật và lưu lại giá trị(state) vào store
            state = reducer(state, action, args);
            render();
        },
    };
}
