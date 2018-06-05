### props
- 属性是由外界传递的，外面不能修改，只有状态属于组件自己
- 声明方式，函数声明(没有生命周期，没有状态，没有this)，类声明（渲染完成：componentDidMount,组件将要卸载：componentWillUnmount）

```
// 类组件
class School extends Component {
  // 继承类的方法：this.setState()
  static propTypes = { // 静态属性，es7
    age: PropTypes.string
  };
  static defaultProps =   { // 校验默认属性
    age: '100'
  };
  constructor(props) {
    super(props);
  }
  render() {
    // 返回组件的样子，只能有一个根元素
    return (
        <div>
            {JSON.stringify(this.props)}
        </div>
    );
  }
}

ReactDOM.render(
  <div>
    <School name="tian" age="9" />
  </div>,
  document.getElementById("root")
);
```


### state
- 点击加号 数字加加

```

class Counter extends Component {
  constructor() {
    super();
    this.state = { count: { number: 0 } };
  }

  // 方法
  handleClick = () => {
    this.setState({
      count: { number: this.state.count.number + 1 }
    });
  };

  render() {// 返回组件的样子，只能有一个根元素
    return (
      <div>
        {this.state.count.number}
        <button onClick={this.handleClick}>+</button>
      </div>
    )
  }
}

ReactDOM.render(
  <div>
    <Counter />
    <Counter />
  </div>,
  document.getElementById("root")
);

```

### react 也是单向数据流
1. 需要将属性一层层向下传递
2. react 是单向数据流

```
// 建一个 panel(根组件)   header  body 组件

class Panel extends Component {
    render () {
        // 第二步：解构，拿到data值
        let {head,body} = this.props;
        return (
            <div className="container">
                <div className="panel-default panel">
                {/* 第三步：赋值到组件的属性里面 */}
                    <Header h={head}></Header>
                    <Body b={body}></Body>
                </div>
            </div>
        )
    }
}

class Header extends Component {
    render () {
        return (
            // 第四部：子组件拿到自己的属性内容进行渲染
            <div className="btn btn-lg btn-block btn-primary">{this.props.h}</div>
        )
    }
}

class Body extends Component {
    render() {
        return (
             // 第四部：子组件拿到自己的属性内容进行渲染
            <div className=" btn btn-lg btn-block btn-primary">{this.props.b}</div>
        )
    }
}

let data = {head: "我是tt",body: "我很美"};

// 第一层步，传递对象 data
ReactDOM.render(<Panel {...data}></Panel>,document.getElementById('root'));
```


