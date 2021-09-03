import {useCallback, useState} from "react";
import http from "../axios-instance";

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const fetchHttpRequest = useCallback(async (requestConfig, applyData) => {
        try {
            setIsLoading(true);
            const res = await http.request({
                url: requestConfig.url ? requestConfig.url : '',
                method: requestConfig.method ? requestConfig.method : 'get',
                data: requestConfig.data ? requestConfig.data : null
            });
            const data = await res.data;
            applyData(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        fetchHttpRequest: fetchHttpRequest,
        error: error,
        isLoading: isLoading
    };
};

export default useHttp;
