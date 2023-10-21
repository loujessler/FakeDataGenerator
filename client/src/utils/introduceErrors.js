export const introduceErrors = (string, errors, alphabet, rng) => {
    for (let i = 0; i < errors; i++) {
        const type = Math.floor(rng() * 3);
        if (type === 0 && string.length > 0) {
            const index = Math.floor(rng() * string.length);
            string = string.slice(0, index) + string.slice(index + 1);
        } else if (type === 1) {
            const index = Math.floor(rng() * string.length);
            const char = alphabet.charAt(Math.floor(rng() * alphabet.length));
            string = string.slice(0, index) + char + string.slice(index);
        } else if (type === 2 && string.length > 1) {
            const index = Math.floor(rng() * (string.length - 1));
            string = string.slice(0, index) + string[index + 1] + string[index] + string.slice(index + 2);
        }
    }
    return string;
};
