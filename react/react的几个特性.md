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

