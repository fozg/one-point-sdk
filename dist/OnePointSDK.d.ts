import { OnePointAPI } from "./api";
import { OnePoint_Actions } from "./action.define";
declare type ItemFilter = {};
declare class Base {
    protected onePointAPI: OnePointAPI;
    constructor(onePointAPI: OnePointAPI);
    protected doAction({ action, payload }: {
        action: OnePoint_Actions;
        payload: any;
    }): Promise<any>;
}
declare class List extends Base {
    private listName;
    private appName;
    constructor(appName: string, listName: string, onePointAPI: OnePointAPI);
    addItem(item: any, shareTeamsId?: string[]): Promise<any>;
    getItemById(itemId: string): Promise<any>;
    getItems(filter?: ItemFilter, teams?: string[]): Promise<any>;
    updateItem(itemId: string, item: any, shareTeamsId?: string[]): Promise<any>;
    deleteItem(itemId: string): Promise<any>;
}
export declare class App extends Base {
    private appName;
    constructor(appName: string, onePointAPI: OnePointAPI);
    addList(displayName: string, name: string): Promise<any>;
    getListByName(listName: string): List;
    getLists(): Promise<any>;
}
export declare class OnePoint {
    private endpoint;
    private onePointAPI;
    private accessToken;
    constructor(endpoint?: string, accessToken?: string);
    private getAccessTokenFromLocalStorage;
    getAppByName(appName: string): App;
    getApps(): Promise<any>;
    createApp(name: string, displayName: string): Promise<any>;
    getListInfoById(listId: string): Promise<any>;
    quickAction(action: OnePoint_Actions, payload: any): Promise<any>;
    shareItem(itemIds: string[], password?: string): Promise<any>;
    getPublicItem(key: string, password?: string): Promise<any>;
    createTeam(name: string, description?: string): Promise<{
        _id: string;
        name: string;
        description?: string;
        created: string;
        createdBy: string;
    }>;
    addTeamMember(teamId: string, username: string): Promise<{
        _id: string;
        username: string;
        created: string;
        createdBy: string;
    }>;
    getTeamsCurrentMember(): Promise<{
        _id: string;
        name: string;
        description?: string;
        created: string;
        createdBy: string;
    }[]>;
}
export {};
