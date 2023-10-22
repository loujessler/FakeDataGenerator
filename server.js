const express = require('express');
const app = express();
const PORT = 5000;


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
