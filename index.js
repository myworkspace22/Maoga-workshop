const express = require('express')
const bodyParser =require('body-parser')
const ejs = require ('ejs')
const sqlite3 = require ('sqlite3')

// NODE.js er backend kode

// Database
const DB = new sqlite3.Database('./db.db3', sqlite3.OPEN_READWRITE, connected)
// ^^^^^^^^^^^^^^^
// Opretter konstant kaldet DB, 
// ('./db.db3', sqlite3.OPEN_READWRITE, connected) Der opretter koden forbindelse til databasen ved navn db.db3
// OPEN_READWRITE Det gier mulighed for at skrive og læse
// Database er et objekt
// 

function connected(err){ // Ser om der er problemer med at forbinde til DB
    if (err) { 
    console.log(err.message) // Logger fejlen
    return //
    }
    console.log('Created a DB or SQLite DB does already exist') // Ellers skriver det her
}

let sql =`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
)`
DB.run(sql)
// opretter SQL funktion
// CREATE TABLE IF NOT EXISTS users
// opretter id, username, password i table
// "VARCHAR" er bare en string, som default er 40 tegn.



// Server handling
const app = express() // Epxress snadder
const port = 3000 // Vi sætter porten til localhost:3000


// Parsing middleware
app.use(bodyParser.json()) // Vi bruger bodyparserer til JSON (hvad det gør skal jeg lige læse op på)
app.use(bodyParser.urlencoded({ extended: true })) // Vi bruger bp til urlencoded

app.engine('html', require('ejs').renderFile) // Vi vælger at rendere med HTML
app.set('view engine', 'html') // Samme som ovenstående

app.use(express.static('views')) // Her sætter vi mappen med siderne som skal loades til "views"

// Server og database snakker frækt med hindanden
// AKA der firetrucking CRUDdes'
// Create
// Read
// Update
// Delet

app.get ('/api', (req, res)=>{ // Get=Read. Arrow function
    // get all users from the table
    res.set('content-type', 'application/json') // sætter HTTP svar headeren "content-type" til application/json, ergo fortæller browseren at den får JSON snask
    const sql = 'SELECT * FROM users' // Den henter alle collums i alle rows i tabellen users (*=alt)
    let data = { users: [] } // sætter funktionen data, som viser indholdet af users
    try{ // forsøg
        DB.all(sql, [], (err, rows)=>{ // henter alle rækker, fra sql ovenfor, hvis der er erros så viser den også dem
            if (err){ // Hvis der opstår en fejl så:
                throw err // kaster fejl afsted (den bold)
            }
            rows.forEach(row => { // Vi henter rækkerne id, username og password
                data.users.push({id: row.id, name: row.username, password: row.password})
            })
            let content = JSON.stringify(data) // laver content om til en JSON string
            res.send(content) // Sender content ud i konsol
        })
    }catch (err){ // den griber fandme bolden hernede
        console.log(err.message) // viser fejlen
        res.status(467) // fantasi kode. Viser hvor fejlen er sket
        res.send('code":467, "status":"${err.message}')
    }
})

app.post ('/api', (req, res)=>{ // Post=Create
    res.set('content-type', 'application/json')
    const sql = 'INSERT INTO users (username, password) VALUES (? , ?)' // Vi sætter input ind i username og password (create)
    let newId // Laver variabel ved navn newId
    try{
        DB.run(sql, [req.body.username, req.body.password], function(err){ // Her bruger vi bødy parser, til at anmode om username og password
            if (err) throw err // kaster bold
            newId = this.lastID // giver auto increment integer (user ID)
            res.status(201) // 201 er status for at noget er blevet lavet
            let data = {status : 201, message: `user ${newId} saved`} // Den skulle vise at et eller andet er lavet
            let content = JSON.stringify(data) // data til string
            res.send(content) // respons sendes (contet)
        })
    }catch (err){ // griber bold
        console.log(err.message)
        res.status(468)
        res.send(`{"code":468, "status":"${err.message}"}`)
    }
})


app.delete ('/api', (req, res)=>{ // Delete=Delete
    res.set('content-type', 'application/json')
    const sql = 'DELETE FROM users WHERE id=?' // Sletter ønsked id
    try{
        DB.run(sql, [req.query.id], function(err){
            if (err) throw err
            if(this.changes===1){
                // en genstand slettes
                res.status(200)
                res.send('{"message":"status":"${req.query.id} was removed from list"}')
            }else{
                res.status(200)
                res.send('{"message":"No operation needed"}')
            }
        })
    }catch (err){
        console.log(err.message)
        res.status(469)
        res.send('{"code":469, "status":"${err.message}"}')
    }
})

app.post ('/register', (req, res)=>{ // logger /register tingen
    console.log(req.body) // Viser at Pernille igen har lavet en ny account
})

app.get('/', (req, res)=>{ // Åbner bare her
    // res.status(200)
    // res.send('users service har ikke skidt i bukserne')
})

// Når der sendes en POST-anmodning til /login, så kører denne funktion
app.post('/login', (req, res) => {
    // Sætter svar-typen til JSON, så klienten ved at det er JSON der bliver sendt tilbage
    res.set('content-type', 'application/json');

    // Vi henter username og password fra det, brugeren har sendt i body'en
    const { username, password } = req.body;

    // Hvis enten brugernavn eller kodeord mangler, sender vi en fejl (400 Bad Request)
    if (!username || !password) {
        res.status(400).send(JSON.stringify({ 
            code: 400, 
            message: "Username or password missing" 
        }));
        return; // Vi stopper her
    }

    // SQL-sætning der leder efter en bruger med det indtastede brugernavn og kodeord
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    try {
        // Vi sender forespørgslen til databasen med de indtastede værdier
        DB.get(sql, [username, password], (err, row) => {
            if (err) {
                // Hvis der sker en fejl under forespørgslen, kaster vi fejlen
                throw err;
            }

            if (row) {
                // Hvis der findes en bruger (row !== undefined), så sender vi OK (200)
                res.status(200);
                res.send(JSON.stringify({
                    status: 200,
                    message: `User ${username} logged in`
                }));
            } else {
                // Hvis ingen bruger findes (forkert brugernavn/kodeord), sender vi en fejl (401 Unauthorized)
                res.status(401);
                res.send(JSON.stringify({
                    code: 401,
                    message: "Invalid username or password"
                }));
            }
        });
    } catch (err) {
        // Hvis der sker en anden fejl (fx SQL-fejl), logges den og vi sender en fejl tilbage
        console.log(err.message);
        res.status(470); // fejlkode vi bruger til intern fejlhåndtering
        res.send(`{"code":470, "status":"${err.message}"}`);
    }
});

app.listen(port, () => {console.log(`Server listening on ${port}`)}) // Koden lytter efter port, og fortæller sgu at den ikke er døv