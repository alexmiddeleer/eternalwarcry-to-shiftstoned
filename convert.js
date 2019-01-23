(function() {
  var exportSplit = document.getElementById('export-deck-text').innerHTML.split('\n');
  var regex = /^(\d+) .+Set(\d+) #(\d+).$/;
  var marketTriplet = [2, 0, 0];
  var tripletsArray = [];
  for (var i = 0; i < exportSplit.length; i++) {
    var matches = exportSplit[i].match(regex);
    if (!matches) {
      if (exportSplit[i].indexOf('MARKET') > 0) {
        tripletsArray = tripletsArray.concat(marketTriplet);
      }
    } else {
      var triplet = [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3], 10)];
      tripletsArray = tripletsArray.concat(triplet);
    }
  }

  var encodedDeck = encodeValues(tripletsArray);
  var deckName = document.querySelector('#body-wrapper > div.container > div.align-c > h1').innerHTML;
  var deckAuthor = document.querySelector('#body-wrapper > div.container > div.align-c > div:nth-child(3) > h3 > a').innerHTML;
  var url = 'https://www.shiftstoned.com/epc/?';
  url += 'd=' + encodedDeck + '&t=' + encodeURIComponent(deckName + ' by ' + deckAuthor);
  console.log(url);

  function encodeValues(values) {
    var code, error;

    code = '';
    for (var j = 0; j < values.length; j++) {
      var i = values[j];
      var r;

      if (error) {
        return;
      }

      if (i < 0) {
        error = 'negative value';
        return;
      }

      if (i === 0) {
        code = code + 'A';
      }

      while (i > 0) {
        r = i % 32;
        i = (i - r) / 32;

        if (i > 0) {
          r = r + 32;
        }

        if (r < 26) {
          code = code + String.fromCharCode(65 + r);
        } else if (r < 52) {
          code = code + String.fromCharCode(97 + r - 26);
        } else if (r < 62) {
          code = code + String.fromCharCode(48 + r - 52);
        } else if (r === 62) {
          code = code + '-';
        } else if (r === 63) {
          code = code + '_';
        }
      }
    }

    if (error) {
      return null;
    }

    return code;
  }

})();
