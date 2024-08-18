from sinpoapp import app, db
from flask import render_template, request, redirect, url_for

from sinpoapp.models.scouts import Scouts, Troops


@app.route("/scouts", methods=["GET", "POST"])
def scouts():
    scoutsList = Scouts.query.join(Troops, Scouts.belong == Troops.id).all()
    return render_template("scouts.html", title="スカウト一覧", list=scoutsList)
