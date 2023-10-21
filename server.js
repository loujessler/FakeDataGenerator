const express = require('express');
const app = express();
const PORT = 5000;

const generateData = (locale, errors) => {
    // Генерация данных в зависимости от локали
    // ... (реализация будет дополнена ниже)

    // Ввод ошибок
    // ... (реализация будет дополнена ниже)

    return data;
}

app.get('/generate/:locale/:errors/:page', (req, res) => {
    const locale = req.params.locale;
    const errors = parseFloat(req.params.errors);
    const page = parseInt(req.params.page, 10);
    const data = generateData(locale, errors, page);
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
