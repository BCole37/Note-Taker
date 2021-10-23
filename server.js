const express = require('express');
const path = require('path');
//bring over functions from fsUtils miniproject
const { readFromFile, readAndAppend, readAndDelete } = require('./helpers/fsUtils');


//const notes = [];

// sets PORT to server or localHost
const PORT = process.env.PORT || 3001;

// express sever setup
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// the Home root activity 1
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// the Notes Route activity 1
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// gets data and puts into db.json
app.get('/api/notes', (req, res) =>
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

let id = 1;

// Post notes soves a note to the db.json
app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;

  //  notes.forEach((note)=>{
       // note.id = id;
       
    //    return notes;
  //  })
        if (req.body) {
            const newNote = {
                title,
                text,
                id: id,
            };
                readAndAppend(newNote, './db/db.json');
            res.json();
        }
        id++;
});

// deletes the note from db.json
app.delete('/api/notes/:id', function(req, res) {
   req.params.id;
   // console.log(req.params.id)
   // for (let i = 0; i < notes.length; i++) {
        //if (notes[i].id === Number(deleteNote)) {
            readAndDelete('./db/db.json', req.params.id)
        //};
        res.json();
});


// Wildcard route to direct users to a 404 index.html page miniproject
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// server listens at specified port miniproject
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);