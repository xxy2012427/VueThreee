import { createVNode, render } from 'vue';
import Toast from '@src/components/Toast';

// 准备一个DOM容器
const div = document.createElement('div');
div.setAttribute('class', 'toast-wrapper');
document.body.appendChild(div);

let time: any = null;

// 初始数据
title = string;
ToastType {
    title: title;
    duration?: number;
}
union = title | ToastType;

export default (options: union) => {
    let title, duration;
    if (typeof options === 'string') {
        title = options || '我是默认文案';
        duration = 2000;
    } else {
        title = (options as ToastType).title || '我是默认文案';
        duration = (options as ToastType).duration || 2000;
    }
    // 创建虚拟dom  (组件对象， props)
    const vnode = createVNode(Toast, { title });

    // 把虚拟dom渲染到div
    render(vnode, div);
    clearTimeout(timer);
    timer = setTimeout(() => {
        render(null, div);
    }, duration);
};
