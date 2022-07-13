const NLPCloudClient = require('nlpcloud');
const developmentAPIkeys = ['b348ed9a13fc6d001f221db7c48072afc7c7925b', '984d3fbf00485553703503402418196474d72524'];

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