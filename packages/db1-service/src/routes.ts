import {AccountsController} from "./controller/AccountsController";

export const Routes = [{
    method: "get",
    route: "/accounts",
    controller: AccountsController,
    action: "all"
}, {
    method: "get",
    route: "/accounts/:id",
    controller: AccountsController,
    action: "one"
}, {
    method: "post",
    route: "/accounts",
    controller: AccountsController,
    action: "save"
},{
    method: "put",
    route: "/accounts",
    controller: AccountsController,
    action: "update"
},{
    method: "delete",
    route: "/accounts",
    controller: AccountsController,
    action: "remove"
}];