$(function(){

    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                // add date to notes
                dateSubmitted: Date.now()
            });
            view.render();
        },

        // getNotes: function() {
        //     return model.getAllNotes();
        // },

        // to display notes in reverse order
        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+ '<span class="note-date">' + new Date(note.dateSubmitted).toString() + '</span>' +
                        note.content +
                    '</li>';
                    // use and add date methods to change the way the date is displayed
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});

// run this to clear data
// localStorage.clear()
