import React, { useEffect, useState } from 'react'

function useCookie(name: string) {

    const [result, setResult] = useState<any>(undefined);

    useEffect(() => {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = decodeURIComponent(cookies[i].trim());

            if (cookie.split("=").slice(0, 1).toString() === name) {
                const find = cookie.split("=").slice(1).toString();
                try {
                    const json = JSON.parse(find);
                    return setResult(json);
                } catch (e) {
                    return setResult(find);
                }
            } else {
                setResult(undefined)
            }
        }
    }, [name])

    return result;
}

export default useCookie
