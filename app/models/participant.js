import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  tick: DS.attr('number'),
  waiting: DS.attr('boolean', {
    defaultValue: false
  }),
  lastTickChange: DS.attr('date', {
    defaultValue() {
      return new Date();
    }
  }),
  tickleiste: DS.belongsTo('tickleiste')
});
