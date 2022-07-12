const NLPCloudClient = require('nlpcloud');
const developmentAPIkeys = ['0d7379148c68d393698c1e8221e235dad775cb69', 'f4ad0bab00baeb2b73d5f95780ad0953e0ae3fbb'];

// generate cloud client 'buckets'
const nlpCloudClients = new function () {
  this.indexTracker = 0;

  this.cycleClient = function() {
      if (this.indexTracker==this.clients.length-1) {
          this.indexTracker = 0;
      }
      else {
          this.indexTracker++;
      }
      return this.indexTracker;
  };

  // API private keys stored in deployment env
  this.keys = process.env.nlpCloudClientKeys?.split(',') || developmentAPIkeys;
  this.clients = this.keys.map( key => new NLPCloudClient('en_core_web_lg', key) );

  this.fetchClient = function() {
    this.cycleClient();
    return this.clients[this.indexTracker];
  }
};

module.exports = nlpCloudClients;