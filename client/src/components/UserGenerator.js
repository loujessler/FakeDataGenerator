import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import seedrandom from 'seedrandom';

import RegionSelector from './RegionSelector';
import ErrorSlider from './ErrorSlider';
import Table from './Table';
import SeedField from "./SeedField";

import { loadDataForRegion } from '../utils/dataLoader';
import { introduceErrors } from "../utils/introduceErrors";

const PAGE_SIZE = 20;

const UserGenerator = () => {
    const [region, setRegion] = useState('us');
    const [errors, setErrors] = useState(0);
    const [data, setData] = useState({ items: [], hasMore: true });
    const [seed, setSeed] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [itemsData, setItemsData] = useState({});
    const [loading, setLoading] = useState(true);

    const generateData = useCallback((pageNumber, append = false) => {
        const rng = seedrandom(seed + pageNumber);

        const generateItem = (_, idx) => {
            if (!itemsData.names || !itemsData.names.male || !itemsData.names.female) {
                console.log('Отсутствуют данные о именах:', itemsData.names);
                return null;
            }

            const genders = ['male', 'female'];
            const chosenGender = genders[Math.floor(rng() * genders.length)];

            if (!itemsData.names[chosenGender]) {
                console.error(`Отсутствуют имена для пола '${chosenGender}'!`);
                return null;
            }

            const namesArray = itemsData.names[chosenGender];

            const name = introduceErrors(namesArray[Math.floor(rng() * namesArray.length)], errors, itemsData.alphabet, rng);
            const surname = introduceErrors(itemsData.surnames[Math.floor(rng() * itemsData.surnames.length)], errors, itemsData.alphabet, rng);

            const fullName = `${name} ${surname}`;

            const street = introduceErrors(itemsData.streets[Math.floor(rng() * itemsData.streets.length)], errors, itemsData.alphabet, rng);
            const city = introduceErrors(itemsData.cities[Math.floor(rng() * itemsData.cities.length)], errors, itemsData.alphabet, rng);

            if (!itemsData.states) {
                console.log('Отсутствуют данные о штатах:', itemsData.states);
                return null; // или другое действие по вашему усмотрению
            }

            const statesKeys = Object.keys(itemsData.states);
            const stateKey = statesKeys[Math.floor(rng() * statesKeys.length)];
            const stateOrRegion = introduceErrors(itemsData.states[stateKey], errors, itemsData.alphabet, rng);

            const address = `${street}, ${city}, ${stateOrRegion}`;

            const phoneFormat = itemsData.countryCode + '-' + itemsData.phoneCodes[stateKey][Math.floor(rng() * itemsData.phoneCodes[stateKey].length)] + itemsData.phoneScheme;
            const phone = introduceErrors(phoneFormat.replace(/#/g, () => Math.floor(rng() * 10)), errors, "0123456789", rng);
            console.log('Сгенерированный элемент:', {
                id: (pageNumber - 1) * PAGE_SIZE + idx,
                uuid: Math.random().toString(36).substring(2, 15) + rng().toString(36).substring(2, 15),
                name: fullName,
                address: address,
                phone: phone
            });
            return {
                id: (pageNumber - 1) * PAGE_SIZE + idx,
                uuid: Math.random().toString(36).substring(2, 15) + rng().toString(36).substring(2, 15),
                name: fullName,
                address: address,
                phone: phone
            };
        };

        const newItems = Array.from({ length: append ? 10 : PAGE_SIZE })
            .map(generateItem)
            .filter(Boolean);  // отсеиваем null значения


        setData(prevData => ({
            items: append ? [...prevData.items, ...newItems] : newItems,
            hasMore: true
        }));
    }, [errors, seed, itemsData]);

    const handleFetchMore = () => {
        setPageNumber(prevPageNumber => {
            generateData(prevPageNumber + 1, true);
            return prevPageNumber + 1;
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const fetchedData = await loadDataForRegion(region);
            if (fetchedData) {
                setItemsData(fetchedData);
                console.log('Загруженные данные для региона:', region, fetchedData);
                setPageNumber(1);
                setData({ items: [], hasMore: true });
                generateData(1);
            }
            setLoading(false);
        };
        fetchData();
    }, [region, errors, seed, generateData]);

    if (loading) {
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
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                <Table data={data.items} />
            </InfiniteScroll>
        </div>
    );
}

export default UserGenerator;
