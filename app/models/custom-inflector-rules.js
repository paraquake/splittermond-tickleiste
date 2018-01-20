import Inflector from 'ember-inflector';

const inflector = Inflector.inflector;

inflector.irregular('tickleiste', 'tickleiste');
inflector.uncountable('advice');

// Meet Ember Inspector's expectation of an export
export default {};
