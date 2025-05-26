const express = require('express')
const bodyParser =require('body-parser')
const ejs = require ('ejs')
const dotenv = ('dotenv')
const sqlite3 = require ('sqlite3')

// Pisse sej database
const DB = new sqlite3.Database('./db.db3', sqlite3.OPEN_READWRITE, connected)

function connected(err){
    if (err) {
    console.log(err.message)
    return
    }
    console.log('Created a DB or SQLite DB does already exist')
}

let sql =`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL
)`
DB.run(sql)


// Server handling
require('dotenv').config()
const app = express()
const port = 3000

// Parsing middleware
app.use(bodyParser.json())

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(express.static('views'))

// Server og database snakker frækt med hindanden
app.get ('/api', (req, res)=>{
    // get all users from the table
    res.set('content-type', 'application/json')
    const sql = 'SELECT * FROM users'
    let data = { users: [] }
    try{
        DB.all(sql, [], (err, rows)=>{
            if (err){
                throw err // let the catch handle it
            }
            rows.forEach(row => {
                data.users.push({id: rows.id, name: rows.username, password:rows.password})
            })
            let content = JSON.stringify(data)
            res.send(content)
        })
    }catch (err){
        console.log(err.message)
        res.status(467)
        res.send('code":467, "status":"${err.message}')
    }
})

app.post ('/api', (req, res)=>{
    console.log(req.body)
    res.set('content-type', 'application/json')
    const sql = 'INSERT INTO users(username, password) VALUES(?,?)'
    let newId
    try{
        DB.run(sql, [req.body.username, req.body.password], function(){
            if (err) throw err
            newId = this.lastID // giver auto increment integer (user ID)
            res.status(201) // 201 er status for at noget er blevet lavet
            let data = {status : 201, message: 'user ${newId} saved'}
            let content = json.stringify(data)
            res.send(content)
        })
    }catch (err){
        console.log(err.message)
        res.status(468)
        res.send('{"code":468, "status":"${err.message}"}')
    }
})


app.delete ('/api', (req, res)=>{
    res.set('content-type', 'application/json')
    const sql = 'DELETE FROM users WHERE id=?'
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
        res.send('{"code":468, "status":"${err.message}"}')
    }
})

app.post ('/register', (req, res)=>{
    console.log(req.body)
})

app.get('/', (req, res)=>{
    res.status(200)
    res.send('users service har ikke skidt i bukserne')
})

app.listen(port, () => {console.log(`Server listening on ${port}`)})