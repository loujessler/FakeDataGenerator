import React from 'react';

const SeedField = ({seed, setSeed, setPageNumber}) => {

    const generateRandomSeed = () => {
        const randomSeed = Math.floor(Math.random() * 100000);  // Генерация случайного числа (вы можете изменить диапазон по своему усмотрению)
        setSeed(randomSeed);
        setPageNumber(1);  // Reset pageNumber whenever seed changes
    };

    const handleChange = (e) => {
        setSeed(Number(e.target.value));
        setPageNumber(1);  // обнуляем номер страницы при каждом изменении seed
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
