import { useCallback, useState } from 'react';
import seedrandom from 'seedrandom';
import {applyErrorsToItem} from "../utils/introduceErrors";


const PAGE_SIZE = 20;

export const useDataGenerator = (errors, seed, itemsData) => {
    const [data, setData] = useState({ items: [], hasMore: true });
    const [pageNumber, setPageNumber] = useState(1);

    const generateData = useCallback((pageNumber, append = false) => {
        const rng = seedrandom(seed + pageNumber);

        const generateItem = (_, idx) => {
            const genders = ['male', 'female'];
            const chosenGender = genders[Math.floor(rng() * genders.length)];

            const namesArray = itemsData.names[chosenGender];

            const name = namesArray[Math.floor(rng() * namesArray.length)];
            const surname = itemsData.surnames[Math.floor(rng() * itemsData.surnames.length)];

            const fullName = `${name} ${surname}`;

            const street = itemsData.streets[Math.floor(rng() * itemsData.streets.length)];
            const city = itemsData.cities[Math.floor(rng() * itemsData.cities.length)];

            const statesKeys = Object.keys(itemsData.states);
            const stateKey = statesKeys[Math.floor(rng() * statesKeys.length)];
            const stateOrRegion = itemsData.states[stateKey];

            const address = `${street}, ${city}, ${stateOrRegion}`;

            const phoneFormat = itemsData.countryCode + '-' + itemsData.phoneCodes[stateKey][Math.floor(rng() * itemsData.phoneCodes[stateKey].length)] + itemsData.phoneScheme;
            const phone = phoneFormat.replace(/#/g, () => Math.floor(rng() * 10));

            const item = {
                id: (pageNumber - 1) * PAGE_SIZE + idx,
                uuid: Math.random().toString(36).substring(2, 15) + rng().toString(36).substring(2, 15),
                name: fullName,
                address: address,
                phone: phone
            };

            return applyErrorsToItem(item, errors, itemsData, rng);
        };

        const newItems = Array.from({ length: append ? 10 : PAGE_SIZE })
            .map(generateItem)
            .filter(Boolean);

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

    return { data, generateData, handleFetchMore, setPageNumber };
};
