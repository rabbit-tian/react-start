### React 插槽
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
</Children>,document.getElementById('root'));
```

