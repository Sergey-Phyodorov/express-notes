document.addEventListener('click', event => {
    if (event.target.dataset.type === 'delete-note') {
        const id = event.target.dataset.id;
        remove(id).then(() => {
            let element = document.getElementById(id);
            element.remove();
        });
    }

    if (event.target.dataset.type === 'edit-note') {
        const id = event.target.dataset.id;
        let element = document.getElementById(`title-${id}`);
        let newTitle = prompt('Enter new title:', `${element.textContent}`);

        if (newTitle) {
            edit(id, newTitle).then(() => {
                if (newTitle !== element.textContent) {
                    element.textContent = newTitle;
                }
            });
        }
    }
});

async function remove(noteId) {
    await fetch(`/${noteId}`, {
        method: 'DELETE'
    });
}

async function edit(noteId, newTitle) {
    await fetch(`/${noteId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newTitle })
    });
}
