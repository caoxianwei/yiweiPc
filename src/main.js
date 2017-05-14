import Vue from 'vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import index from 'components/index/index.vue'
import store from './store'
import './css/common.css'
import './css/animate.css'
import * as filters from './tools/filters'
import { Button, Row, Col, Form, FormItem, Input, Loading, Table, TableColumn, Popover, Dialog,
          Tabs, TabPane , DatePicker, Select, Option, Radio, Slider, Pagination, Tooltip, Checkbox,
          Collapse, CollapseItem} from 'element-ui'

Vue.component(Button.name, Button)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Popover.name, Popover)
Vue.component(Dialog.name, Dialog)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(DatePicker.name, DatePicker)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(Radio.name,Radio)
Vue.component(Slider.name,Slider)
Vue.component(Pagination.name,Pagination)
Vue.component(Tooltip.name,Tooltip)
Vue.component(Checkbox.name,Checkbox)
Vue.component(Collapse.name,Collapse)
Vue.component(CollapseItem.name,CollapseItem)

Vue.use(Loading) 

//注册filter
Object.keys(filters).forEach(function(value){
    Vue.filter(value,filters[value])
})         

sync(store, router)

const app = new Vue({
	router,
    store,
    ...index,
})

app.$mount('#app')
