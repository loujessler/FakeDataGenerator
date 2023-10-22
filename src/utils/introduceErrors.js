const introduceErrors = (string, errors, alphabet, rng, maxChanges) => {
    let operationsCount = 0;

    for (let i = 0; i < errors && operationsCount < maxChanges; i++) {
        const type = Math.floor(rng() * 3);

        if (type === 0 && string.length > 1) {
            const index = Math.floor(rng() * string.length);
            string = string.slice(0, index) + string.slice(index + 1);
        } else if (type === 1 && string.length < 50) {
            const index = Math.floor(rng() * string.length);
            const char = alphabet.charAt(Math.floor(rng() * alphabet.length));
            string = string.slice(0, index) + char + string.slice(index);
        } else if (type === 2 && string.length > 1) {
            const index = Math.floor(rng() * (string.length - 1));
            string = string.slice(0, index) + string[index + 1] + string[index] + string.slice(index + 2);
        }

        operationsCount++;
    }
    return string;
}

const getMaxChangesForField = (fieldName) => {
    switch (fieldName) {
        case "name":
            return 2;
        case "address":
            return 3;
        case "phone":
            return 1;
        default:
            return 1;
    }
}

export const applyErrorsToItem = (item, errors, itemsData, rng) => {
    const fields = ["name", "address", "phone"];

    for (let i = 0; i < errors; i++) {
        const fieldToError = fields[Math.floor(rng() * fields.length)];
        const maxChanges = getMaxChangesForField(fieldToError);

        item[fieldToError] = introduceErrors(item[fieldToError], 1, itemsData.alphabet, rng, maxChanges);
    }
    return item
}
