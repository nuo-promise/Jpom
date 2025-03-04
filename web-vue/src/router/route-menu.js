/**
 * 路由菜单
 * key 对应后台接口返回的菜单中的 id
 * value 表示该路由的 path
 */
const routeMenuMap = {
  'nodeList': '/node/list',
  'sshList': '/node/ssh',
  'outgiving': '/dispatch/list',
  'outgivingLog': '/dispatch/log',
  'outgivingWhitelistDirectory': '/dispatch/white-list',
  'monitor': '/monitor/list',
  'monitorLog': '/monitor/log',
  'buildList': '/build/list',
  'buildHistory': '/build/history',
  'user': '/user/list',
  'roleList': '/role/list',
  'user_log': '/operation/log',
  'monitorConfigEmail': '/system/mail',
  'cacheManage': '/system/cache',
  'logManage': '/system/log',
  'update': '/system/upgrade',
  'sysConfig': '/system/config'
}

export default routeMenuMap
