import React, { useEffect, useState } from 'react'


export type Loading = "loading" | "success" | "idle" | "error";

function useFetch<T>(method: "GET" | "POST" | "PATCH", url: string, query?: string, body?: object) {
    const [data, setData] = useState<T>()
    const [loading, setLoading] = useState<Loading>("idle");

    async function fetchData() {
        setLoading("loading");
        try {
            const req = await fetch("http://localhost:8080" + url + query, {
                body: JSON.stringify(body),
                method: method
            });

            if (req.status === 200) {
                const result = await req.json();
                setLoading("success")
                setData(result.data.result);
            }
        } catch (e) {
            setLoading("error")
        }
    }

    useEffect(() => {
        fetchData();
    }, [url])

    return {
        data: data,
        status: loading,
        reload: fetchData
    }
}

export default useFetch
