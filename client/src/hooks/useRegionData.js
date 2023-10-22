import { useEffect, useState } from 'react';
import { loadDataForRegion } from '../utils/dataLoader';

export const useRegionData = (region) => {
    const [itemsData, setItemsData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedData = await loadDataForRegion(region);
            if (fetchedData) {
                setItemsData(fetchedData);
            }
            setLoading(false);
        };
        fetchData();
    }, [region]);

    return { itemsData, loading };
};
