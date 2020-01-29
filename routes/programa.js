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
      findStream: function(value) {
        let returnValue = value;
        if (typeof value === 'string') {
            const foundArr = /https:\/\/streaming-ondemand.rtp.pt\/.*:[0-9]+/g.exec(value);
            returnValue = foundArr && foundArr.length ? foundArr[0] : null;
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

router.get('/', function(req, res, next) {
    res.json({erro: "Escolha um programa"});
  });

router.get('/:id', function(req, res, next) {
    var stream = x(`https://www.rtp.pt/play/${req.params.id}/`, {
    title: 'title | replaceTitle',
    episodes: x('.episode-item', [
      {
        title: '@title',
        href: '@href | replaceUrl',
        image: 'img@src'
      }
    ])
  }).stream()
  stream.pipe(res);
  });

  router.get('/:id/:episode/:name', function(req, res, next) {
    var stream = x(`https://www.rtp.pt/play/${req.params.id}/${req.params.episode}/${req.params.name}/`, {
    title: 'title | replaceTitle',
    potentialUrls: x(['script | findStream']),
    parts: x('.new-gutter', [
        'a@href | replaceUrl'
    ])
  }).stream()
  stream.pipe(res);
  });

  router.get('/:id/:episode/:name/:part', function(req, res, next) {
    var stream = x(`https://www.rtp.pt/play/${req.params.id}/${req.params.episode}/${req.params.name}/${req.params.part}/`, {
    title: 'title | replaceTitle',
    potentialUrls: x(['script | findStream']),
    parts: x('.new-gutter', [
        'a@href | replaceUrl'
    ])
  }).stream()
  stream.pipe(res);
  });

  router.get('/:id/:episode', function(req, res, next) {
    var stream = x(`https://www.rtp.pt/play/${req.params.id}/${req.params.episode}/`, {
    title: 'title | replaceTitle',
    potentialUrls: x(['script | findStream']),
    parts: x('.new-gutter', [
        'a@href | replaceUrl'
    ])
  }).stream()
  stream.pipe(res);
  });
module.exports = router;
