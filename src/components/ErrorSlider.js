import React, {useState} from 'react';

const ErrorSlider = ({errorRate, setErrorRate, setPageNumber}) => {
    const [sliderMax, setSliderMax] = useState(10);

    const handleSliderChange = (event) => {
        const value = parseFloat(event.target.value);
        setErrorRate(value);
        setPageNumber(1);
        setSliderMax(10);
    };

    const handleInputChange = (event) => {
        const value = parseFloat(event.target.value);
        if (!isNaN(value) && value >= 0 && value <= 1000) {
            setErrorRate(value);
            setPageNumber(1);
            if (value > 10) {
                setSliderMax(1000);
            } else {
                setSliderMax(10);
            }
        }
    };

    return (
        <div className="error-slider-container">
            <label>
                Error slider:
            </label>
            <input
                type="range"
                min="0"
                max={sliderMax}
                step="0.25"
                value={errorRate}
                onChange={handleSliderChange}
            />
            <input
                type="number"
                min="0"
                max="1000"
                step="0.25"
                value={errorRate}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default ErrorSlider;
