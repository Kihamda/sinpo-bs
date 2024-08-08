from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder="html/static", template_folder="html/templates")
app.config.from_object("sinpoapp.config")  # 追加

db = SQLAlchemy(app)

from sinpoapp.views import views, export, scouts
