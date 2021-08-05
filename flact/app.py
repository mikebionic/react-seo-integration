from logging import debug
from flask import Flask
from flask import render_template
from flask import send_from_directory

app = Flask(__name__) #done


@app.route("/")
def index():
  seo_data = {
    "title": "some initial title",
    "description": "fuck thats cool desc"
  }
  return render_template('index.html', seo_data = seo_data)


routes_list = [{
  "path": "contact",
  "title": "contaaaaaaaaaaaact",
  "description": "fuck you you fcking fyck"
}]

@app.route("/<route>")
def route_configured(route):
  seo_data = {
    "title": "blank title",
    "description": "Blank desc"
  }

  for r in routes_list:
    if r["path"] == route:
      seo_data["title"] = r["title"]
      seo_data["description"] = r["description"]

  return render_template('index.html', seo_data = seo_data) # how to render template

@app.route("/locales/<lang>/<filename>")
def get_locale_file(lang, filename):
  print('found request')
  print(lang, filename)
  return send_from_directory('static', f'locales/{lang}/{filename}')


if __name__ == "__main__":
  app.run("0.0.0.0", port=5000, debug=True) #done