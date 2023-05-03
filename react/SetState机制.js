// 参考：React 的 setState 是同步还是异步？
 https://juejin.cn/post/7108362046369955847

// react 目前分为两个大版本
// v17 
// v18 

// 这两个版本下的 react 表现得形式也不相同

// 就比如 SetState 机制来说

class Dong extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                count: 1
            });
            console.log(this.state.count);
            this.setState({
                count: 2
            });
            console.log(this.state.count);  
        });
    }
    render() {
        console.log('render:', this.state.count);
        return <div>{this.state.count}</div>;
    }
}
// 打印 
// render: 0
// 1
// 2 

// setState 在 setTimeout 中的表现为 “同步的形式”

class Dong extends Component {
    constructor() {
        super();
        this.state = {
            count: 0
        }
    }
    componentDidMount() {
        this.setState({
            count: 1
        });
        console.log(this.state.count);
        this.setState({
            count: 2
        });
        console.log(this.state.count);
        this.setState({
            count: 3
        });
        console.log(this.state.count);
    }
    render() {
        console.log('render:', this.state.count);
        return <div>{this.state.count}</div>;
    }
}

/**
 * render: 0
 * 0
 * 0
 * 3
 */

// 在这种修改中却又表现出 “异步形式”

// 其实按理来说 setState 不能叫异步，还是在同一个调用栈执行的，只不过顺序不同而已。只能叫批量还是非批量。

// 因为 react 在使用 setState 方法但是被包裹在异步代码中，修改状态并不会被标记为 “批量修改”
// 所以每次更新像同步的那样
// 而没有包裹在异步代码中的 setState 方法去就该就会被标记为 “批量修改” 从而导致在使用完 this.setState 并不能在下文及时取到最新值

// 在 v18 版本中就不会出现这个问题

// v18的并发模式可以确保在 异步代码中也能是“批量修改” 



// 特别的

// 为了兼容 v17 的这种情况 v18 在没有开启并发模式还是会用 v17 的例子

// state 存储的值 function or object 

/**
 * setState(nextState, callback)
 * 
 * 1. nextStaet 可以是 function or object
 * 
 * 2. nextState 如果是对象那就会和 state 进行浅合并
 * 
 * 3. nextState 如果是 函数 那就必须是纯函数，它的返回值 会浅合并到 state 中 它会接受上一次
 *    状态来计算下一次状态
 * 
 * 4. callback 更新后触发回调
 */ 