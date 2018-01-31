/**
 * Created by zhangyuanyuan031 on 17/5/23.
 */
import PageHome from 'service/page-home'

const PAGEHOME = 'PAGEHOME';

const getMeunDone = (menuDate) => ({
    type: PAGEHOME,
    payload: menuDate
});

// 获取菜单数据的action
export const pageAction = () => {
    return (dispatch) => {
        PageHome.getMenu().then(data => {
            dispatch(getMeunDone(data));
        })
    }
};