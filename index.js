const express = require('express');
const chalk = require('chalk');
const path = require('path');
const {
    addNote,
    getNotes,
    removeNote,
    updateNote
} = require('./notes.controller.js');

const port = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    res.render('index', {
        notes: await getNotes(),
        createNote: false
    });
});

app.post('/', async (req, res) => {
    const titleNote = req.body.note;
    await addNote(titleNote);
    res.render('index', {
        notes: await getNotes(),
        createNote: true
    });
});

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id);

    res.render('index', {
        notes: await getNotes(),
        createNote: false
    });
});

app.put('/:id', async (req, res) => {
    await updateNote({ id: req.params.id, title: req.body.title });
    res.render('index', {
        notes: await getNotes(),
        createNote: false
    });
});

app.listen(port, () => {
    console.log(chalk.green(`Server работает на порту ${port}`));
});
