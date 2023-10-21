export function generateError(str, alphabet) {
    const errorType = Math.floor(Math.random() * 3);
    const position = Math.floor(Math.random() * str.length);

    switch (errorType) {
        case 0:  // Удаление символа
            return str.slice(0, position) + str.slice(position + 1);
        case 1:  // Добавление символа
            const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
            return str.slice(0, position) + randomChar + str.slice(position);
        case 2:  // Перестановка символов
            if (position === str.length - 1) return str; // Если это последний символ, возвращаем без изменений
            return str.slice(0, position) + str[position + 1] + str[position] + str.slice(position + 2);
        default:
            return str;
    }
}
