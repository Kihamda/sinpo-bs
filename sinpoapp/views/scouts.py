from sinpoapp import app, db
from flask import render_template, request, redirect, url_for

from sinpoapp.models.scouts import Scouts, Troops


@app.route("/scouts", methods=["GET", "POST"])
def scouts():
    if request.method == "GET":
        scoutsList = (
            db.session.query(
                Scouts,
                Scouts.id,
                Scouts.middle,
                Scouts.name,
                Troops.name.label("trp_name"),
            )
            .join(Troops, Troops.id == Scouts.belong)
            .all()
        )
        tps = db.session.query(Troops).all()
        return render_template(
            "scouts/scouts.html", title="スカウト一覧", list=scoutsList, trp=tps
        )
    elif request.method == "POST":
        data = request.json
        print("new data:" + data.get("id"))
        if data.get("id") == "new":

            scout = Scouts(
                middle=data.get("middle"),
                name=data.get("name"),
                belong=data.get("belong"),
                wasbvs=data.get("wasbvs"),
                wascs=data.get("wascs"),
                wasbs=data.get("wascs"),
                wasvs=data.get("wasvs"),
                wasrs=data.get("wasrs"),
            )
            db.session.add(scout)
            db.session.commit()
        else:
            scout = db.session.query(Scouts).filter(Scouts.id == data.get("id"))
            scout.middle = data.get("middle")
            scout.name = data.get("name")
            scout.belong = data.get("belong")
            scout.wasbvs = data.get("wasbvs")
            scout.wascs = data.get("wascs")
            scout.wasbs = data.get("wascs")
            scout.wasvs = data.get("wasvs")
            scout.wasrs = data.get("wasrs")
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
