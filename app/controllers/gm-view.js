import Controller from '@ember/controller';
import {
  filterBy,
  sort
} from '@ember/object/computed';
import {
  inject
} from '@ember/service';
export default Controller.extend({
  participantsInFight: filterBy('model.participants', 'waiting', false),
  participantsWaiting: filterBy('model.participants', 'waiting', true),
  sortProperties: ['tick:asc', 'lastTickChange:asc'],
  ordered: sort('participantsInFight', 'sortProperties'),
  socketIOService: inject('socket-io'),
  namespace: '',
  actions: {
    addParticipant() {
      this.get('store').findRecord('tickleiste', 1, {
        include: 'participants',
        reload: true
      }).then((tickleiste) => {
        var p1 = this.get('store').createRecord('participant', {
          name: this.get('name'),
          tick: this.get('tick'),
          waiting: false,
          lastTickChange: new Date()
        });
        tickleiste.get('participants').then((participants) => {
          participants.pushObject(p1);
          p1.save().then(() => {
            tickleiste.save().then(() => {
              const socket = this.get('socketIOService').socketFor('http://localhost:7000/');
              socket.emit('plsupdate');
              this.get('model').get('participants').reload();
            });
            this.set('name', '');
            this.set('tick', '');
          });
        });
      });
    },
    incrementTick(params) {
      params.participant.incrementProperty('tick', parseInt(params.incTickVal));
      params.participant.save();
      this.get('store').findRecord('tickleiste', 1, {
        reload: true
      }).then((tickleiste) => {
        tickleiste.save().then(() => {
          const socket = this.get('socketIOService').socketFor('http://localhost:7000/');
          socket.emit('plsupdate');
        });
      });
    },
    setTick(params) {
      params.participant.set('tick', parseInt(params.setTickVal));
      params.participant.save();
      this.get('store').findRecord('tickleiste', 1, {
        reload: true
      }).then((tickleiste) => {
        tickleiste.save().then(() => {
          const socket = this.get('socketIOService').socketFor('http://localhost:7000/');
          socket.emit('plsupdate');
        });
      });
    },
    setWaitingVal(params) {
      params.participant.set('waiting',params.setWaitingVal);
      if(params.setTickVal){
        params.participant.set('tick', parseInt(params.setTickVal));
      }
      params.participant.save();
      this.get('store').findRecord('tickleiste', 1, {
        reload: true
      }).then((tickleiste) => {
        tickleiste.save().then(() => {
          const socket = this.get('socketIOService').socketFor('http://localhost:7000/');
          socket.emit('plsupdate');
        });
      });
    },
    removeParticipant(params) {
       params.participant.destroyRecord();
      this.get('store').findRecord('tickleiste', 1, {
        reload: true
      }).then((tickleiste) => {
        tickleiste.save().then(() => {
          const socket = this.get('socketIOService').socketFor('http://localhost:7000/');
          socket.emit('plsupdate');
            this.get('model').reload();
        });
      });
    }
  },

  init() {
    this._super(...arguments);
    const socket = this.get('socketIOService').socketFor('http://localhost:7000/');
    // socket.on('reloadRecords', this.onMessage, this);


  },
  onMessage(data) {
    const socket = this.get('socketIOService').socketFor('http://localhost:7000/');
    console.log(data);
  }

});
