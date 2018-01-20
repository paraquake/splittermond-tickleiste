import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return this.get('store').findRecord('tickleiste', 1, {
      include: 'participants',
      reload: true
    }).catch(() => {
      var tickleiste = this.get('store').createRecord('tickleiste', {
        id: 1
      });
      tickleiste.save();
      return tickleiste;
    });
  }
});
