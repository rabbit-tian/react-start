// 必写的两行
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // 导入app组件
import registerServiceWorker from './registerServiceWorker';

// 挂载点
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
