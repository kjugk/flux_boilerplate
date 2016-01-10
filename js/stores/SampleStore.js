import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'
import { SAY_SOMETHING } from '../actions/SampleActions'

const CHANGE_EVENT = 'change'
let _sample = {word: ''}

function setWord(word){
  _sample.word = word
}

const SampleStore = Object.assign({}, EventEmitter.prototype, {
  getSample(){
    return _sample
  },

  emitChange: function() {
   this.emit(CHANGE_EVENT);
 },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
})

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  switch(action.actionType) {
    case SAY_SOMETHING:
      setWord(action.word);
      SampleStore.emitChange();
      break;

    default:
      // no op
  }
});

export default SampleStore
