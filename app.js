require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoConfig = require('./config/mongo.config');
const sequelize = require('./config/mysql.config');

const authRoutes = require('./routes/auth.routes');
const toggleRoutes = require('./routes/toggle.routes');
const dataRoutes = require('./routes/data.routes');
const viewRoutes = require('./routes/view.routes');

const app = express();

mongoConfig();
sequelize.authenticate()
.then(() => console.log('Connected to MySQL'))
.catch(console.error);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api/auth', authRoutes);
app.use('/api/toggle', toggleRoutes);
app.use('/api/data', dataRoutes);
app.use('/', viewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
