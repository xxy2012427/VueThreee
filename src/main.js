import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Button } from 'vant';
import 'vant/lib/index.css';
import App from './App.vue'
import router from './router'
import { Popup, Checkbox, CheckboxGroup } from 'vant';
import { Field } from 'vant';
import { Cell, CellGroup } from 'vant';
import { ActionSheet } from 'vant';
import { ActionBar, ActionBarIcon, ActionBarButton } from 'vant';
import { Col, Row } from 'vant';
import { Dialog } from 'vant';
import { Toast } from 'vant';
import './assets/main.css'
import "./assets/theme/index.css"
import '@/assets/iconfont/iconfont.css'
import 'vant/es/dialog/style'
import * as echarts from 'echarts';

const app = createApp(App);

//import { NewToast } from "../src/request/toast2.js";
//app.use(NewToast);

app.use(createPinia());
app.use(router);
app.use(Button);
app.use(Cell);
app.use(CellGroup);
app.use(Field);
app.use(Popup);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(ActionSheet);
app.use(ActionBar);
app.use(ActionBarIcon);
app.use(ActionBarButton);
app.use(Col);
app.use(Row);app.use(Dialog);
app.use(Toast);
app.config.globalProperties.$echarts = echarts;
app.mount('#app');
