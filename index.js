/* import './realize.js'; */

/*
 *  description 一点点替换react中的方法
 */

// 一段基础的 react 代码

/* import ReactDOM from 'react-dom';
import React from 'react';
const element = <h1 title="foo">Hello</h1>; //一段jsx组件代码
const container = document.getElementById('app');
ReactDOM.render(element, container); */

// jsx babel 转译后

/*  const element = React.createElement('h1', { title: 'foo' }, "hello")
    console.log(element);
    const container = document.getElementById("app")
    ReactDOM.render(element, container) */

// React.createElement 返回一个对象 大致为

/* const element = {
        type: 'h1',
        props: {
            title: 'foo',
            children: 'Hello'
        }
    }
    const container = document.getElementById("app")
    ReactDOM.render(element, container) */

// 替换reactDOM.render()
/* const element = {
  type: 'h1',
  props: {
    title: 'foo',
    children: 'Hello'
  }
};

const node = document.createElement(element.type);
const container = document.getElementById('app');
node['title'] = element.props.title;
const text = document.createTextNode(''); // 详见下方备注1
text['nodeValue'] = element.props.children;
node.appendChild(text);
container.appendChild(node); */

// 备注1： 创建一个文本节点 详见：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createTextNode
