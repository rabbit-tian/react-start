## react 生命周期

### 图片展示
- ![react生命周期](media/react%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F.png)


### 具体分析

1. 组件 的生命周期
    - 第一步：defaultProps
    - 第二步：constructor 构造函数
    - 第三步：组件将要加载 componentWillMount
    - 第四步：render
    - 第五步：组件加载完成 componentDidMount
    - 第六步：组件是否应该更新shouldComponentUpdate
    - 第七步：组件将要更新 componentWillUpdate
    - 第八步：组件更新完成 componentDidUpdate

2. 父组件和子组件的结合的生命周期
    - 1.父亲：constructor 构造函数
    - 2.父亲：组件将要加载 componentWillMount
    - 3.父亲：render
    - 4.儿子：childcomponentWillMount
    - 5.儿子：child render
    - 6.儿子：childcomponentDidMount
    - 7.父亲：组件加载完成 componentDidMount
    
3. 点击加加按钮后，更新数据时
    - 1.父亲：组件是否应该更新 shouldComponentUpdate
    - 2.父亲：组件将要更新 componentWillUpdate
    - 3.父亲：render
    - 4.儿子：childcomponentWillReceiveProps
    - 5.儿子：child render
    - 6.儿子：组件更新完成 componentDidUpdate
    
   
    
    ```
    // 父组件
    // 先走 defaultProps，然后走constructor
    class Counter extends Component {
      static defaultProps = {
        name: "tian"
      };
    
      constructor(props) {
        super();
        this.state = { number: 0 };
        console.log("1. constructor 构造函数");
      }
    
      componentWillMount() {
        // 加载同步本地的代码 如 ：localStorage.getItem('a)，只渲染一次
        console.log("2.组件将要加载 componentWillMount");
      }
    
      componentDidMount() {
        // 异步代码 ，也可以放在componentWillMount中
        console.log("4.组件加载完成 componentDidMount");
      }
    
      // 点击加加
      // 不能随便使用 setState, 可能会出现死循环
      handleClick = () => {
          this.setState({number:this.state.number+1})
      }
    
      // 组件是否应该更新，返回布尔值，默认返回 true
      // 组件优化： 如果这次更新和上次相同，就阻止更新
      // React.pureComponent 也能实现这个优化，缺点：同一个引用空间也不会更新
      shouldComponentUpdate (nextProps,nextState) { // 下一次的属性，下一次的状态
          console.log(nextState);
          console.log("5. 组件是否应该更新 shouldComponentUpdate");
    
          // 如果这次更新和上次相同，就阻止更新
          //   return nextState.number !== this.state.number;  // 如果此函数中调用了false，就不会调用render的方法
    
          return nextState.number % 2;
        }
    
      // 组件将要更新
      componentWillUpdate () {
          console.log("6. 组件将要更新 componentWillUpdate");
      }
    
      //组件更新完成
      componentDidUpdate () {
          console.log("7. 组件更新完成 componentDidUpdate");
      }
    
      render() {
        console.log("3. render");
    
        return (
          <div>
            <p>{this.state.number}</p>
            <button onClick={this.handleClick}>+</button>
    
            <ChildCounter n={this.state.number}></ChildCounter>
          </div>
        );
      }
    }
    
    
    
    // 子组件
    class ChildCounter extends Component {
        // 组件将要加载
        componentWillMount () {
            console.log("child" + "componentWillMount");
        }
        // 组件加载完成
        componentDidMount() {
            console.log("child" + "componentDidMount");
        }
    
        // 接收到属性, 第一次不会执行，属性更新时才会执行
        componentWillReceiveProps () { 
            console.log("child" + "componentWillReceiveProps");
        }
        // 应该更新 属性：子组件判断接收的属性，是否满足更新条件，为 true 就更新
        shouldComponentUpdate(nextProps,nextState) {
            return nextProps.n % 3; // 只有是3 的倍数才更新
        }
    
        render () {
            console.log('child render');
            return (
                <div>
                    {this.props.n}
                </div>
            )
        }
    }

    ```

