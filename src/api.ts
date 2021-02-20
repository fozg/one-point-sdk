import axios from 'axios'

// OnePointAPI using 200only API
export class OnePointAPI {
    private baseUrl: string;
    private accessToken: string;
    constructor(baseUrl: string, accessToken: string) {
        this.baseUrl = baseUrl;
        this.accessToken = accessToken;
    }

    private async doAction(action: string, payload?: any) {
        try {
            let result = await axios.post(this.baseUrl + "/twohundred", {
                action,
                payload,
            }, {
                headers: {
                    authorization: `Bearer ${this.accessToken}`
                }
            })
            return result.data
        } catch (e) {
            return {
                action,
                isError: true,
                message: e.message
            }
        }
    }

    private async doPublicAction(action: string, payload?: any) {
        try {
            let result = await axios.post(this.baseUrl + "/twohundred/p/twohundred", {
                action,
                payload,
            })
            return result.data
        } catch (e) {
            return {
                action,
                isError: true,
                message: e.message
            }
        }
    }



    public action(action: string) {
        return {
            payload: (payload: any) => ({ call: () => this.doAction(action, payload) }),
            call: () => this.doAction(action)
        }
    }

    public actionPublic(action: string) {
        return {
            payload: (payload: any) => ({ call: () => this.doPublicAction(action, payload) }),
            call: () => this.doAction(action)
        }
    }
}

