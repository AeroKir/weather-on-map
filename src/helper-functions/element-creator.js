// TODO Make this function more flexible

/**
 * Create new DOM elements.
 * Accepts the following parameters:
 * elem - name of created element e.g. 'div', 'main' etc...
 * Invoked with argument type 'String'.
 * elemClass - string with class name of created element.
 * Invoked with argument type 'String'.
 */

function elementCreator(elem, elemClass) {
  const newElem = document.createElement(String(elem));
  newElem.className = String(elemClass);
  return newElem;
}

export default elementCreator;
