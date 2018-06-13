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

