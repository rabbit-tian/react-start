### React 插槽
- this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点
-  this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。
-  React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

```
class Children extends Component {
    render () {
        return <div>
            {/* 
                this.props.children获取组件中间的内容 
                1. 不传递 children  =>  [object Undefined] undefined
                2. 传递一个 => [object Object] 对象类型
                3. 传递两个以上 =>  [object Array] 数组类型
                4. 我们可以用 React.Children.map ，专门用来遍历 this.props.children 的
            */} 

            {/* {this.props.children}
            {Object.prototype.toString.call(this.props.children)} */}

            {/* React.Children  专门用来遍历react的孩子的 */}
            {React.Children.map(this.props.children,(item,index) => (
                <li key={index}>{item}</li>
            ))}

          </div>;
    }
}

ReactDOM.render(<Children>
    <div>汉堡</div>
    <div>汉堡</div>
    <div>汉堡</div>
</Children>,document.getElementById('root'));
```

