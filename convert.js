(function() {
  var exportSplit = document.getElementById('export-deck-text').innerHTML.split('\n');
  var regex = /^(\d+) .+Set(\d+) #(\d+).$/;
  var marketTriplet = [2, 0, 0];
  var triplets = [];
  for (var i = 0; i < exportSplit.length; i++) {
    var matches = exportSplit[i].match(regex);
    if (!matches) {
      if (exportSplit[i].indexOf('MARKET') > 0) {
        triplets.push(marketTriplet);
      }
    } else {
      var triplet = [matches[1], matches[2], matches[3]];
      triplets.push(triplet);
    }
  }
  console.log(triplets);
})();
