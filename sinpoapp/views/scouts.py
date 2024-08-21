from sinpoapp import app, db
from flask import render_template, request, redirect, url_for

from sinpoapp.models.scouts import Scouts, Troops


@app.route("/scouts", methods=["GET", "POST"])
def scouts():
    if request.method == "GET":
        scoutsList = Scouts.query.join(Troops, Scouts.belong == Troops.id).all()
        tps = db.session.query(Troops).all()
        return render_template(
            "scouts/scouts.html", title="スカウト一覧", list=scoutsList, trp=tps
        )
    elif request.method == "POST":
        data = request.form
        if data["id"] == "new":
            scout = Scouts(
                middle=data["middle"],
                name=data["name"],
                belong=data["belong"],
                wasbvs=data["wasbvs"],
                wascs=data["wascs"],
                wasbs=data["wascs"],
                wasvs=data["wasvs"],
                wasrs=data["wasrs"],
            )
            db.session.add(scout)
        else:
            scout = Scouts(
                middle=data["middle"],
                name=data["name"],
                belong=data["belong"],
                wasbvs=data["wasbvs"],
                wascs=data["wascs"],
                wasbs=data["wascs"],
                wasvs=data["wasvs"],
                wasrs=data["wasrs"],
            )
            db.session.add(scout)
        db.session.commit()
        return redirect(url_for("scouts"))


@app.route("/scouts/<scoutId>", methods=["GET"])
def scout(scoutId):
    scout = Scouts.query.get(scoutId)
    return render_template("scouts/scout.html", scout=scout)


@app.route("/scouts/create/<scoutId>", methods=["GET"])
def scoutCreate(scoutId):
    scout = Scouts.query.get(scoutId)
    tps = db.session.query(Troops).all()
    return render_template("scouts/create.html", p=scout, trp=tps, scoutid=scoutId)
