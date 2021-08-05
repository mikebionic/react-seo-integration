var express = require('express')

var routes_list = require('./page_data')

var app = express()


app.set('view engine', 'ejs')
app.use('/static', express.static('static'))

app.listen(8080);

app.get('/', function(req,res) {
  var seo_response = get_page_data()
  res.render('index', {seo_data: seo_response})
})

const get_page_data = (page_route_name = '') => {

  var seo_response = {
    "title": "Sap Çözgüt | Sap Hasap",
    "description": "Söwda awtomatlaşdyrma, Ynamdar hyzmat, Döwrebap internet sahypalary, Mobile programma üpjünçiligi"
  };

  routes_list.map((r) => {
    if (r["path"] === page_route_name.toString()){
      seo_response["title"] = r["title"]
      seo_response["description"] = r["description"]
    }
  })
  return seo_response;
}

app.get('/:route', function(req,res){
  var seo_response = get_page_data(req.params.route)
  res.render('index', {seo_data: seo_response})
})

app.get('/locales/:lang/:filename', function(req,res){
  var lang = req.params.lang
  var filename = req.params.filename
  res.sendFile(`${__dirname}/static/locales/${lang}/${filename}`)
})

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});    
