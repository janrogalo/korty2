const express = require("express");
const http = require("http")

const nodemailer = require("nodemailer")
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 8080

app.set("port", port)
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'));

//Routing
app.get("/", function(req, response){
    response.render('index.html')
})

app.post("/send_email", function(req, response){
    const from = req.body.from;
    const name = req.body.name;
    const surname = req.body.surname;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jedynetakiekorty@gmail.com',
            pass : 'ktyggkibiqgumkul'
        }
    })

    const mailOptions = {
        from: from,
        to:'jan.rogalo@gmail.com',
        subject:'Jedyne takie korty',
        text: `Wiadomość wysłał/a ${name} ${surname} - ${from}:
-------------------------------------
Szanowny Panie Prezydencie,
zwracamy się do Pana z apelem o ochronę dziedzictwa naszego miasta, jakim jest historyczne założenie Forum Sportowego, w tym kortów tenisowych “Arki” oraz “Górki”.

Nadmorskie, najcenniejsze obszary Gdyni wymagają szczególnej troski w obliczu rosnącej presji inwestycyjnej. Forum Sportowe ma znaczenie historyczne, kulturowe, urbanistyczne i krajobrazowe, lecz także bardzo istotne są jego funkcje publiczne - sportowe i rekreacyjne.

Funkcje te należy chronić, gdyż stanowią dobro i własność naszej gdyńskiej wspólnoty samorządowej. Nie można pozwolić, by służyły one celom prywatnej, komercyjnej funkcji budowlanej, a tym grożą obecne zapisy planu miejscowego nr 1407 obejmującego ten teren.

Przyszłe pokolenia gdynian zasługują na to, żeby w pełni korzystać z potencjału tego niepowtarzalnego miejsca. Cały teren Forum Sportowego stanowi wartość i zasługuje na ochronę prawną i konserwatorską.

W Urzędzie Miasta istnieją wyspecjalizowane komórki organizacyjne odpowiedzialne za zachowanie gdyńskiego dziedzictwa, z których wsparcia można skorzystać w tej sytuacji. Ma Pan Prezydent po swojej stronie gdyńską społeczność kibiców, organizacje pozarządowe, ludzi sportu i kultury. Nie pozwólmy na to, by prywatne interesy odebrały nam naszą gdyńską tożsamość.

Z poważaniem,

${name} ${surname}
       `
    }

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error)
        } else {
            console.log("Wiadomość została wysłana")
        }
        response.redirect("/")
    })
})

//Initialize Web Server
server.listen(port, function(){
    console.log("starting server on port " + port)
})
console.clear()
