import { useEffect, useState } from 'react'

export default function (onePointSdkFn: () => Promise<any>, initData: any = [], watch: any[] = []) {
    const [data, setData] = useState(initData);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const recall = () => {
        onePointSdkFn().then((res: { data: any, isError: boolean }) => {
            if (res.isError) {
                setIsError(true)
            } else {
                setData(res.data)
            }
            setLoading(false)
        })
    }

    useEffect(() => {
        recall()
    }, watch)

    return { data, loading, isError, setData, recall }
}
