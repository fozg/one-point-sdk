export declare class OnePointAPI {
    private baseUrl;
    private accessToken;
    constructor(baseUrl: string, accessToken: string);
    private doAction;
    private doPublicAction;
    action(action: string): {
        payload: (payload: any) => {
            call: () => Promise<any>;
        };
        call: () => Promise<any>;
    };
    actionPublic(action: string): {
        payload: (payload: any) => {
            call: () => Promise<any>;
        };
        call: () => Promise<any>;
    };
}
