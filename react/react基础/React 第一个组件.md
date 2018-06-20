### chrome中安装 React工具 
1. `React Developer Tools`

### 第一个App组件 介绍
1. App.js 根组件，默认导出
    
    ```
    import React, { Component } from 'react';
    class App extends Component {
      render() {
        return (
          <div>
            hello world
          </div>
        );
      }
    }
    
    export default App;
    ```
    
2. 给入口文件  index.js 引用
    
    ```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    
    ReactDOM.render(<App />, document.getElementById('root'));
    ```    
3. public 中的 index.html 是最终入口文件，最后放入线上环境中使用
4. 注意点
    - 关键字： class => className


