import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPendingState, setIsPendingState] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const abortCont = new AbortController();

        setTimeout(() =>
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Can not load data!');
                    }
                    return res.json();
                }).then(data => {
                    setData(data);
                    setIsPendingState(false);
                }).catch(error => {
                    if (error.name === 'AbortError') {
                        console.log('AbortError');
                    } else {
                        setIsPendingState(false);
                        setError(error.message);
                    }

                })
            , 1000);

        return () => abortCont.abort();
    }, [url]);
    return { data, isPendingState, error }
}

export default useFetch;