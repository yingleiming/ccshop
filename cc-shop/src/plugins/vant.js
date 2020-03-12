import Vue from 'vue';

//1.底部导航
import { Tabbar, TabbarItem } from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);

//2.加载Loading
import { Loading } from 'vant';

Vue.use(Loading);

//3.图片懒加载
import { Image } from 'vant';

Vue.use(Image);

//4.提示
import { Toast } from 'vant';

Vue.use(Toast);

//5.蒙版提升
import { Dialog } from 'vant';

Vue.use(Dialog);

//导航条
import { NavBar } from 'vant';

Vue.use(NavBar);

//地址
import { ContactCard, ContactList, ContactEdit } from 'vant';

Vue.use(ContactCard);
Vue.use(ContactList);
Vue.use(ContactEdit);

import { AddressList } from 'vant';

Vue.use(AddressList);
