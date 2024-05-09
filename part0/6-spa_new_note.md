
1. user saves new note which performs a POST request to https://studies.cs.helsinki.fi/exampleapp/new_note_spa

2. spa.js contains code that prevents page reload on form submission using .preventDefault()

3. pushes new note onto notes array then calls the function redrawNotes() to re-create note elements on page along with the new note 

4. note is sent to the server using sendToServer(note)