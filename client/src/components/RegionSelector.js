import React from 'react';

const regions = [
    { value: 'us', label: 'USA (English)' },
    { value: 'pl', label: 'Poland (Polish)' },
    { value: 'uz', label: 'Узбекистан (Узбекский)' },
];

const RegionSelector = ({ selectedRegion, setSelectedRegion }) => {

    // Обработчик изменения региона
    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
    };

    return (
        <div className="region-selector-container">
            <label>
                Region:
                <select value={selectedRegion} onChange={handleRegionChange}>
                    {regions.map((region) => (
                        <option key={region.value} value={region.value}>
                            {region.label}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}

export default RegionSelector;
