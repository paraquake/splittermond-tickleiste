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
  init() {
    this._super(...arguments);
    const socket = this.get('socketIOService').socketFor('http://localhost:7000/');
    socket.on('reloadRecords', this.onReloadTrigger, this);


  },
  onReloadTrigger(data) {
    var newModel = this.store.findRecord('tickleiste', 1, {
      include: 'participants',
      reload: true
    });
    this.get('model').get('participants').reload();
  }
});
