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
    const sql = 'SELECT * FROM users' // Kan hente specifikt data fra users table
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
    let newId // Laver funktion ved navn newId
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

app.listen(port, () => {console.log(`Server listening on ${port}`)}) // Koden lytter efter port, og fortæller sgu at den ikke er døv