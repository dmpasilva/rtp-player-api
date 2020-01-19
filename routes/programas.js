var express = require('express');
var router = express.Router();
var Xray = require('x-ray');

var x = Xray({
    filters: {
      trim: function(value) {
        return typeof value === 'string' ? value.trim() : value
      },
      reverse: function(value) {
        return typeof value === 'string'
          ? value
              .split('')
              .reverse()
              .join('')
          : value
      },
      slice: function(value, start, end) {
        return typeof value === 'string' ? value.slice(start, end) : value
      },
      replaceTitle: function(value) {
        return typeof value === 'string' ? value.replace(" - RTP Play - RTP", "") : value
      },
      replaceUrl: function(value) {
          let returnValue = value;
          if (typeof value === 'string') {
            returnValue = value.replace('https://www.rtp.pt/play/', '')
          }
          return returnValue;
      },
      replaceCategoryHref: function(value) {
        let returnValue = value;
        if (typeof value === 'string') {
          returnValue = value.replace('https://www.rtp.pt/play/programas/', '');
          returnValue = returnValue.replace('/canal', '');
        }
        return returnValue;
      },
      removeEpisode: function(value) {
        let returnValue = value;
        if (typeof value === 'string') {
          returnValue = value.replace(/\/e[0-9]+.*/g, '')
        }
        return returnValue;
    }
    }
  });



router.get('/categorias', function(req, res, next) {
  var stream = x('https://www.rtp.pt/play/programas', '.item', [{
    title: '@title | replaceTitle',
    href: '@href | replaceCategoryHref'
  }]).stream()
  stream.pipe(res)
});

router.get('/', function(req, res, next) {
    var stream = x('https://www.rtp.pt/play/programas/tema/channels-tv', '.episode-item', [{
      title: '@title | replaceTitle',
      href: '@href | replaceUrl | removeEpisode',
      image: 'img@src'
    }]).stream()
    stream.pipe(res)
  });

router.get('/:category', function(req, res, next) {
    var stream = x(`https://www.rtp.pt/play/programas/${req.params.category}/channels-tv`, {
    title: 'title | replaceTitle',
    items: x('.episode-item', [
      {
        title: '@title',
        href: '@href | replaceUrl | removeEpisode',
        image: 'img@src'
      }
    ])
  }).stream()
  stream.pipe(res);
  });

router.get('/:category/:canal', function(req, res, next) {
    /*var stream = x(``, '.episode-item', [{
      title: '@title',
      href: '@href',
      image: 'img@src'
    }]).stream()*/
    

    var stream = x(`https://www.rtp.pt/play/programas/${req.params.category}/${req.params.canal}`, {
    title: 'title',
    items: x('.episode-item', [
      {
        title: '@title | replaceTitle',
        href: '@href | replaceUrl | removeEpisode',
        image: 'img@src'
      }
    ])
  }).stream()
  stream.pipe(res);
  });
module.exports = router;
