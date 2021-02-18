import { OnePointAPI } from "./api";
import { OnePoint_Actions } from "./action.define";

const DEVELOPMENT_TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiZm96ZyIsIm5hbWUiOiJQaG9uZyIsImF2YXRhcl91cmwiOiJodHRwczovL2F2YXRhcnMzLmdpdGh1YnVzZXJjb250ZW50LmNvbS91LzM3MDE1MTY4P3M9NDYwJnY9NCJ9LCJpYXQiOjE2MTE5NDEyMTV9.IX0yKq8I2WKz7KiZSA3Wr6CHmofxNO7AbHWrFDAVP0o`;
const LOCALSTORAGE_TOKEN_KEY = "token";
const DEVELOPMENT_ENDPOINT = `http://localhost:3003`;
const PRODUCTION_ENDPOINT = `https://fozg.net/opapi`;

type ItemFilter = {};

class Base {
    protected onePointAPI: OnePointAPI;

    constructor(onePointAPI: OnePointAPI) {
        this.onePointAPI = onePointAPI;
    }

    protected doAction({ action, payload }: { action: OnePoint_Actions; payload: any }) {
        return this.onePointAPI.action(action).payload(payload).call();
    }
}

class List extends Base {
    private listName: string;
    private appName: string;

    constructor(appName: string, listName: string, onePointAPI: OnePointAPI) {
        super(onePointAPI);
        this.listName = listName;
        this.appName = appName;
    }

    addItem(item: any) {
        return this.doAction({
            action: OnePoint_Actions.CREATE_LIST_ITEM,
            payload: {
                appName: this.appName,
                listName: this.listName,
                item: item,
            },
        });
    }

    getItemById(itemId: string) {
        return this.doAction({
            action: OnePoint_Actions.GET_LIST_ITEM,
            payload: {
                appName: this.appName,
                listName: this.listName,
                itemId
            }
        })
    }


    getItems(filter: ItemFilter = []) {
        return this.doAction({
            action: OnePoint_Actions.GET_LIST_ITEMS,
            payload: {
                appName: this.appName,
                listName: this.listName,
                filter,
            },
        });
    }

    updateItem(itemId: string, item: any) {
        return this.doAction({
            action: OnePoint_Actions.UPDATE_LIST_ITEM,
            payload: {
                appName: this.appName,
                listName: this.listName,
                itemId,
                item
            }
        })
    }

    deleteItem(itemId: string) {
        return this.doAction({
            action: OnePoint_Actions.DELETE_LIST_ITEM,
            payload: {
                listName: this.listName,
                appName: this.appName,
                itemId
            }
        })
    }

    shareItem(itemId: string) { }
}

export class App extends Base {
    private appName: string;

    constructor(appName: string, onePointAPI: OnePointAPI) {
        super(onePointAPI);
        this.appName = appName;
    }

    addList(displayName: string, name: string) {
        return this.doAction({
            action: OnePoint_Actions.CREATE_LIST,
            payload: {
                appName: this.appName,
                name,
                displayName,
            }
        })
    }

    getListByName(listName: string) {
        return new List(this.appName, listName, this.onePointAPI);
    }

    getLists() {
        return this.doAction({ action: OnePoint_Actions.GET_LISTS_BY_APP, payload: { appName: this.appName } })
    }
}

export class OnePoint {
    private endpoint = process.env.NODE_ENV === "development" ? DEVELOPMENT_ENDPOINT : PRODUCTION_ENDPOINT;
    private onePointAPI: OnePointAPI;
    private accessToken: string;

    constructor(endpoint?: string, accessToken?: string) {
        this.accessToken = this.getAccessTokenFromLocalStorage();
        if (endpoint) {
            this.endpoint = endpoint;
        }
        if (accessToken) {
            this.accessToken = accessToken;
        }
        this.onePointAPI = new OnePointAPI(this.endpoint, this.accessToken);
    }

    private getAccessTokenFromLocalStorage() {
        if (process.env.NODE_ENV === "development") return DEVELOPMENT_TOKEN;
        return localStorage.getItem(LOCALSTORAGE_TOKEN_KEY) as string;
    }

    getAppByName(appName: string) {
        return new App(appName, this.onePointAPI);
    }

    getApps() {
        return this.onePointAPI.action(OnePoint_Actions.GET_APPS_BY_USER).payload({}).call();
    }

    createApp(name: string, displayName: string) {
        return this.onePointAPI.action(OnePoint_Actions.CREATE_APP).payload({ name, displayName }).call();
    }

    getListInfoById(listId: string) {
        return this.onePointAPI.action(OnePoint_Actions.GET_LIST_BY_ID).payload({ listId }).call();
    }

    quickAction(action: OnePoint_Actions, payload: any) {
        return this.onePointAPI.action(action).payload(payload).call();
    }
}
