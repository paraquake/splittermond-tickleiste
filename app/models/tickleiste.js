import DS from 'ember-data';

const {
  hasMany
} = DS;

export default DS.Model.extend({
  participants: hasMany('participant'),
});
