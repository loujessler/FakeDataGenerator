import React, { useState, useEffect } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import RegionSelector from './RegionSelector';
import ErrorSlider from './ErrorSlider';
import Table from './Table';
import SeedField from "./SeedField";
import { useDataGenerator } from '../hooks/useDataGenerator';
import { useRegionData } from '../hooks/useRegionData';

const UserGenerator = () => {
    const [region, setRegion] = useState('us');
    const [errors, setErrors] = useState(0);
    const [seed, setSeed] = useState(0);

    const { itemsData, loading: loadingRegionData } = useRegionData(region);
    const { data, generateData, handleFetchMore, setPageNumber } = useDataGenerator(errors, seed, itemsData);

    useEffect(() => {
        if (!loadingRegionData) {
            setPageNumber(1);
            generateData(1);
        }
    }, [region, errors, seed, itemsData, loadingRegionData, setPageNumber, generateData]);

    if (loadingRegionData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
                <RegionSelector selectedRegion={region} setSelectedRegion={setRegion} />
                <ErrorSlider errorRate={errors} setErrorRate={setErrors} setPageNumber={setPageNumber} />
                <SeedField seed={seed} setSeed={setSeed} setPageNumber={setPageNumber} />
            </div>
            <InfiniteScroll
                dataLength={data.items.length}
                next={handleFetchMore}
                hasMore={data.hasMore}
                loader={<h4>Loading...</h4>}
            >
                <Table data={data.items} />
            </InfiniteScroll>
        </div>
    );
}

export default UserGenerator;
