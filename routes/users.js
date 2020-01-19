var express = require('express');
var router = express.Router();
var x = require('x-ray')()

/* GET users listing. */
router.get('/', function(req, res, next) {
  /*var stream = x('https://www.rtp.pt/play/programas', {
    title: 'title',
    items: ['.item']
  }).stream()*/

  /*var stream = x('https://www.rtp.pt/play/programas', {
    title: 'title',
    items: x('.item', [
      {
        title: '@title',
        href: '@href'
      }
    ])
  }).stream()*/

  var stream = x('https://www.rtp.pt/play/programas', '.item', [{
    title: '@title',
    href: '@href'
  }]).stream()

  /*stream = x('https://www.rtp.pt/play/programas', {
  title: 'title',
  items: x('.owl-item', [
    {
      title: '.meta-data h4',
      description: '.item-content section'
    }
  ])
}).stream()*/
  stream.pipe(res)
});

module.exports = router;
