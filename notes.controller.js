const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
    const notes = await getNotes();

    const note = {
        id: Date.now().toString(),
        title
    };

    notes.push(note);

    await saveNotes(notes);
    console.log(chalk.bgGreenBright('Note was added!'));
}

async function getNotes() {
    try {
        const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
        return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
    } catch (error) {
        console.error(chalk.red('Failed to read notes:', error));
        return [];
    }
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
    const notes = await getNotes();

    console.log(chalk.bgBlueBright('List of notes:'));
    notes.forEach(note => {
        console.log(chalk.bgWhite(note.id), chalk.blue(note.title));
    });
}

async function removeNote(id) {
    const notes = await getNotes();
    const updatedNotes = notes.filter(note => note.id !== id);
    await saveNotes(updatedNotes);
    // await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
    console.log(chalk.redBright(`Note id='${id}' was removed!`));
}

module.exports = { addNote, printNotes, removeNote };
