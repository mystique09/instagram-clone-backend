const express = require('express')
const app = express()
const cors = require('cors');

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.send('index');
})

app.get('*', (req, res)=>{
    res.send('404, not found!');
})

app.listen(process.env.PORT || 3000, function(){
    console.log(`Connected on port ${process.env.PORT || 3000}!`)
})