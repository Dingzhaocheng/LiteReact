// 还是那一段基础的 react 代码，当多层组件嵌套

/* const element = (
  <div id="foo">
    <div className="hello">123</div>
    <a href="#">5555</a>
    <p>454554</p>
  </div>
);
console.log(element); //输出结果见下方注释1
const container = document.getElementById('app');
ReactDOM.render(element, container); */

//上面的jsx 相当于使用createElement

/*  const element = React.createElement(
         "div",
         { id: "foo" },
         React.createElement("div", {className:'hello'},'123'),
         React.createElement("a", {href:'#'},'5555'),
         React.createElement("p",null,'454554')
     )
     const container = document.getElementById("app");
     ReactDOM.render(element, container); */

//自己实现一个createElement

function createTextNode(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  };
}

function createElement(type, props, ...children) {
  // createElement 需要的参数 详见： https://zh-hans.reactjs.org/docs/jsx-in-depth.html
  return {
    //返回一个对象
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === 'object' ? child : createTextNode(child)
      )
    }
  };
}

function render(element, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type); //判断是否为文本节点，创建不同的元素
  const isProperty = key => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => (dom[name] = element.props[name]));
  element.props.children.forEach(child => render(child, dom));
  container.appendChild(dom);
}

const LiteReact = {
  //自定义一个react 对象，填入方法
  createElement,
  render
};

//文中的babel jsx 指定转译方法 这里未生效，所以这里先不添加了😓
const element = LiteReact.createElement(
  'div',
  { id: 'foo' },
  LiteReact.createElement('div', { className: 'hello' }, '123'),
  LiteReact.createElement('a', { href: '#' }, '5555'),
  LiteReact.createElement('p', null, '454554')
);

console.log(element);
const container = document.getElementById('app');
LiteReact.render(element, container);

// 注释1:
/*
*Object
$$typeof: Symbol(react.element)
key: null
props:
children: Array(3)
0: {$$typeof: Symbol(react.element), type: "div", key: null, ref: null, props: {…}, …}
1: {$$typeof: Symbol(react.element), type: "a", key: null, ref: null, props: {…}, …}
2: {$$typeof: Symbol(react.element), type: "p", key: null, ref: null, props: {…}, …}
length: 3
[[Prototype]]: Array(0)
id: "hello"
[[Prototype]]: Object
ref: null
type: "div"
_owner: null
_store: {validated: false}
_self: null
_source: null

*/
