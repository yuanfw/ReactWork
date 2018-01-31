/**
 * Created by zhangyuanyuan031 on 17/5/22.
 */

export default  {
    user: (state = {}, action) => {
        switch (action.type) {
            case "LOG_IN":
                return action.payload
            default:
                return state
        }
    }
};


