/**
 * Created by zhangyuanyuan031 on 17/5/22.
 */
import ajax from 'util/ajax';

class PageHome {

    getMenu() {
        return ajax(
            "menu/getAllMenus.do",
            "POST"
        )
    }
}

export default new PageHome();
