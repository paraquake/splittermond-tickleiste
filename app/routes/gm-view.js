import Route from '@ember/routing/route';

export default Route.extend({
  model: function() {
    return this.get('store').findRecord('tickleiste', 1, {
      include: 'participants',
      reload : true
    }).catch(() => {
      var tickleiste = this.get('store').createRecord('tickleiste', {
        id: 1
      });
      tickleiste.save();
      return tickleiste;
    });
  }
});
//for future ref
// import Route from '@ember/routing/route';
//
// export default Route.extend({
//   model: function() {
//     var insertStuff = (tickleiste) => {
//       var p1 = this.get('store').createRecord('participant', {
//         name: 'test 1',
//         tick: 2,
//         waiting: false,
//         lastTickChange: new Date()
//       });
//       tickleiste.get('participants').then((participants) => {
//         participants.pushObject(p1);
//         p1.save().then(() => {
//           tickleiste.save();
//         });
//       });
//       return tickleiste;
//     }
//     return this.get('store').findRecord('tickleiste', 1, {
//       include: 'participants'
//     }).then((tickleiste) => {
//        return tickleiste;
//
//     }).catch((error) => {
//     var tickleiste =  this.get('store').createRecord('tickleiste', {
//         id: 1
//       });
//       tickleiste.save();
//       return tickleiste;
//     });
//   }
//
//
// });
