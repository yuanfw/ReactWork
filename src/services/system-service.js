/**
 * Created by zhangyuanyuan031 on 17/7/6.
 */
import ajax from 'util/ajax';

export const getMenueService=()=>ajax("menu/getAllMenus.do", "POST");
// export const getMenueService=()=>ajax("../json/page-home.json", "GET");

