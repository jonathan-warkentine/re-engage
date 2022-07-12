const NLPCloudClient = require('nlpcloud');

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
  this.keys = process.env.nlpCloudClientKeys.split(',');
  this.clients = this.keys.map( key => new NLPCloudClient('en_core_web_lg', key) );
};

module.exports = nlpCloudClients;