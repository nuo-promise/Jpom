/**
 * 用户相关的 store
 * 存储了用户的 token，用于接口请求的权限验证
 * 存储用户的基本信息，用于展示
 * 存储该用户对应的菜单列表，用于渲染侧边栏菜单
 * 同样提供与之对应的更新功能
 */
import {
  TOKEN_KEY,
  USER_INFO_KEY,
  MENU_KEY
} from '../../utils/const'

import { getUserInfo } from '../../api/user';
import { getSystemMenu } from '../../api/menu';
import routeMenuMap from '../../router/route-menu';

const user = {
  state: {
    token: localStorage.getItem(TOKEN_KEY),
    userInfo: JSON.parse(localStorage.getItem(USER_INFO_KEY)),
    menus: JSON.parse(localStorage.getItem(MENU_KEY))
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setMenus(state, menus) {
      state.menus = menus
    }
  },
  actions: {
    // 登录 data = {token: 'xxx', userName: 'name'}
    login({commit}, data) {
      return new Promise((resolve, reject) => {
        commit('setToken', data.token);
        commit('setUserName', data.userName);
        localStorage.setItem(TOKEN_KEY, data.token);
        // 加载用户信息
        getUserInfo().then(res => {
          if (res.code === 200) {
            commit('setUserInfo', res.data);
            localStorage.setItem(USER_INFO_KEY, JSON.stringify(res.data));
          }
        })
        // 加载系统菜单
        getSystemMenu().then(res => {
          res.data.forEach(element => {
            if (element.childs.length > 0) {
              const childs = element.childs.map(child => {
                return {
                  ...child,
                  'path': routeMenuMap[child.id]
                }
              });
              element.childs = childs;
            }
          });
          commit('setMenus', res.data);
          localStorage.setItem(MENU_KEY, JSON.stringify(res.data));
          resolve();
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 退出登录 移除对应的 store
    logOut({dispatch, commit}) {
      return new Promise((resolve) => {
        commit('setToken', '');
        commit('setMenus', '');
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(MENU_KEY);
        // 调用其他 action
        dispatch('clearTabs');
        resolve();
      })
    }
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserInfo(state) {
      return state.userInfo;
    },
    getMenus(state) {
      return state.menus;
    }
  }
}

export default user
