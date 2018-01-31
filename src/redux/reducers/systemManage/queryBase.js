export const menuManage = (state = {}, action) => {
    switch (action.type) {
        case "getMenu":
            return Object.assign({}, {type: "getMenu", payload: action.payload});
        default:
            return state;
    }
};

export const privilegeManage = (state = {}, action) => {
    switch (action.type) {
        case "getPrivilege":
            return Object.assign({}, {type: "getPrivilege", payload: action.payload});
        default:
            return state;
    }
};

export const userManage = (state = {}, action) => {
    switch (action.type) {
        case "getUserList":
            return Object.assign({}, {type: "getUserList", payload: action.payload});
        default:
            return state;
    }
};