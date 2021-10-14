import { useState } from 'react';
import Api from '../api';

const useData = (type,id) => {
    const [data,loadData] = useState()
    const [isLoading,changeLoading] = useState(true)

    const getData = async () => {
        const data = (type === 'user') ? await Api.getUser(id) : await Api.getAllUsers() 
    
        loadData(() => data)
        changeLoading(false)
    }

    return [data,getData,isLoading]
}

export {useData};