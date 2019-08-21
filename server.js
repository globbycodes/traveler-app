const express = require('express');
const bodyParser = require('body-parser');
const dbSetup = require('./database/setup/db-setup');


const guests = require('./routes/api/guests');
const companies = require('./routes/api/companies');
const templates = require('./routes/api/templates');
const emailer = require('./routes/api/emailer');

dbSetup();

const port = 8000;

const app = express();

app.use(bodyParser.json());

app.use('/api/guests/', guests);
app.use('/api/companies/', companies);
app.use('/api/templates/', templates);
app.use('/api/emailer/', emailer);

app.listen(port, () => console.log(`server started on port ${port}`));