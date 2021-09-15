export enum OnePoint_Actions {
    CREATE_APP = "OP.CREATE_APP",                                      // create an app
    GET_APP_INFO = "OP.GET_APP_INFO",                                  // get the app info by app's name
    GET_APPS_BY_USER = "OP.GET_APP_BY_USER",                           // get all apps create by user     
    GET_LIST_BY_ID = "OP.GET_LIST",                                    // get list info by list id
    GET_LISTS_BY_APP = "OP.GET_LISTS_BY_APP",                          // get lists by app's name
    GET_LIST_ITEM = "OP.GET_LIST_ITEM",                                // get list_item by item id
    GET_LIST_ITEMS = "OP.GET_LIST_ITEMS",                              // get list_items by app, list & filter
    DELETE_LIST_ITEM = "OP.DELETE_LIST_ITEM",                          // delete list item by app, list, itemId
    CREATE_LIST_ITEM = "OP.CREATE_LIST_ITEM",                          // create list item
    UPDATE_LIST_FIELDS = "OP.UPDATE_LIST_FIELDS",                      // update fields's list
    UPDATE_LIST_ITEM = "OP.UPDATE_LIST_ITEM",                          // update item
    UPDATE_LIST_PERMISSION = "OP.UPDATE_LIST_PERMISSION",              // update list permission,
    CREATE_LIST = "OP.CREATE_LIST",                                     // create a list


    CREATE_TEAM = "OP.CREATE_TEAM",
    TEAM_ADD_MEMBER = "OP.TEAM_ADD_MEMBER",
    GET_TEAMS_CURRENTMEMBER = "OP.GET_TEAMS_CURRENTMEMBER",   
    
    
    SHARE_ITEMS_PUBLIC = "OP.SHARE_ITEMS_PUBLIC",                        // share item
    // PUBLIC ACTION
    PUBLIC_GET_PUBLIC_ITEM = "OP.PUBLIC.GET_SHARE_ITEM",

}