### HTML 模板
1. React 独有的 JSX 语法，跟 JavaScript 不兼容。


### ReactDOM.render()
1. ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。
    - 下面代码将一个 h1 标题，插入 example 节点

```
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('example')
);
```

### JSX 语法
1. HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法，它允许 HTML 与 JavaScript 的混写

    - JSX 的基本语法规则：遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析
    
    ```
    var names = ['Alice', 'Emily', 'Kate'];
    
    ReactDOM.render(
      <div>
      {
        names.map(function (name) {
          return <div>Hello, {name}!</div>
        })
      }
      </div>,
      document.getElementById('example')
    );
    ```

2. JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员
    
    ```
    var arr = [
      <h1>Hello world!</h1>,
      <h2>React is awesome</h2>,
    ];
    ReactDOM.render(
      <div>{arr}</div>,
      document.getElementById('example')
    );
    ```
    - 上面代码的arr变量是一个数组，结果 JSX 会把它的所有成员，添加到模板，运行结果如下
    
    ```
    Hello world!
    React is awesome
    ```

### 组件
1. React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。React.createClass 方法就用于生成一个组件类
    
    ```
    var HelloMessage = React.createClass({
      render: function() {
        return <h1>Hello {this.props.name}</h1>;
      }
    });
    
    ReactDOM.render(
      <HelloMessage name="John" />,
      document.getElementById('example')
    );
    ```
    - 上面代码中，变量 HelloMessage 就是一个组件类。模板插入 <HelloMessage /> 时，会自动生成 HelloMessage 的一个实例（下文的"组件"都指组件类的实例）。所有组件类都必须有自己的 render 方法，用于输出组件。
    - 注意，组件类的第一个字母必须大写，否则会报错，比如HelloMessage不能写成helloMessage。另外，组件类只能包含一个顶层标签，否则也会报错。
    - 组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 <HelloMessage name="John"> ，就是 HelloMessage 组件加入一个 name 属性，值为 John。组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

### this.props.children
1. this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点
    
    ```
    var NotesList = React.createClass({
      render: function() {
        return (
          <ol>
          {
            React.Children.map(this.props.children, function (child) {
              return <li>{child}</li>;
            })
          }
          </ol>
        );
      }
    });
    
    ReactDOM.render(
      <NotesList>
        <span>hello</span>
        <span>world</span>
      </NotesList>,
      document.body
    );
    ```
    - 上面代码的 NoteList 组件有两个 span 子节点，它们都可以通过 this.props.children 读取
    - 这里需要注意， this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。
    - React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

### PropTypes

1. 组件的属性可以接受任意值，字符串、对象、函数等等都可以。有时，我们需要一种机制，验证别人使用组件时，提供的参数是否符合要求。
2. 组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求
3. demo
    
    ```
    var MyTitle = React.createClass({
      propTypes: {
        title: React.PropTypes.string.isRequired,
      },
    
      render: function() {
         return <h1> {this.props.title} </h1>;
       }
    });
    
    // 上面的Mytitle组件有一个title属性。PropTypes 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。现在，我们设置 title 属性的值是一个数值。
    
    var data = 123;
    ReactDOM.render(
      <MyTitle title={data} />,
      document.body
    );
    
    //这样一来，title属性就通不过验证了。控制台会显示一行错误信息。

    // 报错：Warning: Failed propType: Invalid prop `title` of type `number` supplied to `MyTitle`, expected `string`.
    
    ```

4. getDefaultProps 方法可以用来设置组件属性的默认值。
    
    ```
    var MyTitle = React.createClass({
      getDefaultProps : function () {
        return {
          title : 'Hello World'
        };
      },
    
      render: function() {
         return <h1> {this.props.title} </h1>;
       }
    });
    
    ReactDOM.render(
      <MyTitle />,
      document.body
    );
    ```

### 获取真实的DOM节点
1. 组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
2. 但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性
    
    ```
    var MyComponent = React.createClass({
      handleClick: function() {
        this.refs.myTextInput.focus();
      },
      render: function() {
        return (
          <div>
            <input type="text" ref="myTextInput" />
            <input type="button" value="Focus the text input" onClick={this.handleClick} />
          </div>
        );
      }
    });
    
    ReactDOM.render(
      <MyComponent />,
      document.getElementById('example')
    );
    ```
    - 上面代码中，组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。为了做到这一点，文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。
    - 需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会读取 this.refs.[refName] 属性。
    - React 组件支持很多事件，除了 Click 事件以外，还有 KeyDown 、Copy、Scroll 等
    

### this.state
1. 组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI
    
    ```
    var LikeButton = React.createClass({
      getInitialState: function() {
        return {liked: false};
      },
      handleClick: function(event) {
        this.setState({liked: !this.state.liked});
      },
      render: function() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
          <p onClick={this.handleClick}>
            You {text} this. Click to toggle.
          </p>
        );
      }
    });
    
    ReactDOM.render(
      <LikeButton />,
      document.getElementById('example')
    );
    ```
    
    - 上面代码是一个 LikeButton 组件，它的 getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。
    - 由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。

### 表单
1. 用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取
    
    ```
    var Input = React.createClass({
      getInitialState: function() {
        return {value: 'Hello!'};
      },
      handleChange: function(event) {
        this.setState({value: event.target.value});
      },
      render: function () {
        var value = this.state.value;
        return (
          <div>
            <input type="text" value={value} onChange={this.handleChange} />
            <p>{value}</p>
          </div>
        );
      }
    });
    
    ReactDOM.render(<Input/>, document.body);
    
    ```
    - 上面代码中，文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况


### 组件的生命周期
1. 组件的生命周期分成三个状态：
    - Mounting：已插入真实 DOM
    - Updating：正在被重新渲染
    - Unmounting：已移出真实 DOM

2. React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

    - componentWillMount()
    - componentDidMount()
    - componentWillUpdate(object nextProps, object nextState)
    - componentDidUpdate(object prevProps, object prevState)
    - componentWillUnmount()

3. 此外，React 还提供两种特殊状态的处理函数。
    - componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
    - shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用

4. 

