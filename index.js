const express = require('express');
const morgan = require('morgan');
const {Prohairesis} = require('prohairesis');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;


const mySqlString = process.env.CLEARDB_DATABASE_URL;
const database = new Prohairesis(mySqlString);


app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.listen(port, () => {console.log(`Server listening on port ${port}`)});


app.get('/balls', async(req,res) => {
    const balls = await database.query(`
    SELECT MAX(id) FROM User`);
    res.json(balls);
});

app.post('/submit', async (req, res) => {
    await database.execute(`
    INSERT INTO User (
    firstname,
    surname,
    email) VALUES (
    @firstname,
    @surname,
    @email )
    `,{
        firstname: req.body.firstname,
        surname: req.body.surname,
        email:req.body.email
    })

    res.end('Success');
})


