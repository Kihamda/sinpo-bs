from sinpoapp import app
from flask import render_template


@app.route("/")
def index():
    return render_template("index.html", title="HOME")


@app.route("/lump")
def lump():
    return render_template("lump.html", title="一括操作")


@app.route("/settings")
def settings():
    return render_template("settings.html", title="設定")


@app.route("/help")
def help():
    return render_template("help.html", title="へルプ")
