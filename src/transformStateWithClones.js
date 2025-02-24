'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const statesAfterActions = [];
  const stateCopy = { ...state };

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    switch (type) {
      case 'clear':
        for (const key in stateCopy) {
          delete stateCopy[key];
        }
        break;

      case 'addProperties':
        for (const key in extraData) {
          stateCopy[key] = extraData[key];
        }
        break;

      case 'removeProperties':
        for (const key in keysToRemove) {
          delete stateCopy[keysToRemove[key]];
        }
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    statesAfterActions.push(Object.assign({}, stateCopy));
  }

  return statesAfterActions;
}

module.exports = transformStateWithClones;
