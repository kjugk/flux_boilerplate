import AppDispatcher from '../dispatcher/AppDispatcher'
export const SAY_SOMETHING = 'SAY_SOMETHING'

var SampleActions = {
  saySomething(word) {
    AppDispatcher.dispatch({
      actionType: SAY_SOMETHING,
      word
    });
  }
};

export default SampleActions
