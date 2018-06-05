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



