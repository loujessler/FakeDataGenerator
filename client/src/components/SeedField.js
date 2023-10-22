import React from 'react';

const SeedField = ({seed, setSeed, setPageNumber}) => {
    const generateRandomSeed = () => {
        const randomSeed = Math.floor(Math.random() * 100000);
        setSeed(randomSeed);
        setPageNumber(1);
    };

    const handleChange = (e) => {
        setSeed(Number(e.target.value));
        setPageNumber(1);
    };

    return (
        <div className="seed-field-container">
            <label>
                Seed:
                <input
                    type="text"
                    value={seed}
                    onChange={handleChange}
                    placeholder="Enter seed"
                />
                <button onClick={generateRandomSeed}>Random</button>
            </label>
        </div>
    );
}

export default SeedField;
