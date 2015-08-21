'use strict';

app.service('NotesBackend', ['$http', function NotesBackend($http) {
  var self = this;
  var notes = [];

  self.getNotes = function() {
    return notes;
  };

  self.fetchNotes = function(callback) {
    $http.get(nevernoteBasePath + 'notes?api_key=' + apiKey)
      .success(function(notesData) {
        notes = notesData;
        callback(notes, {});
      });
  };

  self.postNote = function(noteData, callback) {
    $http.post(nevernoteBasePath + 'notes', {
      api_key: apiKey,
      note: noteData
    }).success(function(newNoteData) {
      notes.unshift(newNoteData.note);
      callback(notes, newNoteData.note);
    });
  };

  self.putNote = function(noteData, callback) {
    $http.put(nevernoteBasePath + 'notes/' + noteData.id, {
      api_key: apiKey,
      note: noteData
    }).success(function(updatedNoteData) {
      self.replaceNote(updatedNoteData.note, callback);
    });
  };

  self.replaceNote = function(updatedNoteData, callback) {
    for (var i = 0; i < notes.length; i++) {
      if (notes[i].id === updatedNoteData.id) {
        notes[i] = updatedNoteData;
        callback(notes, updatedNoteData);
        return updatedNoteData;
      }
    }
  };
}]);
