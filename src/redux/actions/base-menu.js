import {error} from 'util'
import {getMenueService} from 'service/system-service'

// 获取菜单
export const getMenuAction=()=>(dispatch)=>getMenueService().then((res)=>dispatch({type:"getMenu",payload:res}))
