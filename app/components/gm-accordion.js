import Component from '@ember/component';

export default Component.extend({
  tagName: 'div',
  participant: null,
  "increment-tick": null,
  "set-tick": null,
  actions: {
    incrementTick: function() {
      this.get('increment-tick')({
        participant: this.get('participant'),
        incTickVal: this.get('incTickVal')
      });
      this.set('incTickVal', '');
    },
    setTick: function() {
      this.get('set-tick')({
        participant: this.get('participant'),
        setTickVal: this.get('setTickVal')
      });
      this.set('setTickVal', '');
    },
    setWaitingTrue: function() {
      this.get('set-waiting')({
        participant: this.get('participant'),
        setWaitingVal: true
      });
    },
    setWaitingFalse: function() {
      this.get('set-waiting')({
        participant: this.get('participant'),
        setTickVal: this.get('setTickVal'),
        setWaitingVal: false
      });
    }
  }
});
