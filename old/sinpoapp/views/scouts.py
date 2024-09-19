from sinpoapp import app, db
from flask import render_template, request, redirect, url_for

from sinpoapp.models.scouts import Scouts, Troops


def whatScoutWas(ida):
    if ida != "new":
        with app.app_context():
            scoutwas = (
                db.session.query(
                    Scouts.wasbvs,
                    Scouts.wascs,
                    Scouts.wasbs,
                    Scouts.wasvs,
                    Scouts.wasrs,
                )
                .where(Scouts.id == ida)
                .all()[0]
            )
            count = 1
            waslist = []
            for a in scoutwas:
                if a:
                    data = str(
                        db.session.query(Troops.short)
                        .where(Troops.id == count)
                        .all()[0][0]
                    )
                    if a != scoutwas[-1]:
                        data = data[:-1]
                    waslist.append(data)
                count = count + 1
            return waslist
    else:
        return []


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
                memo=data.get("memo"),
            )
            db.session.add(scout)
            db.session.commit()
        else:
            print("data add")
            scout = Scouts.query.get(data.get("id"))
            scout.middle = data.get("middle")
            scout.name = data.get("name")
            scout.belong = data.get("belong")
            scout.wasbvs = data.get("wasbvs")
            scout.wascs = data.get("wascs")
            scout.wasbs = data.get("wascs")
            scout.wasvs = data.get("wasvs")
            scout.wasrs = data.get("wasrs")
            scout.memo = data.get("memo")
            print("data add" + str(data))
            db.session.commit()

        return redirect(url_for("scouts"))


@app.route("/scouts/<scoutId>", methods=["GET"])
def scout(scoutId):
    scout = (
        db.session.query(
            Scouts,
            Scouts.id,
            Scouts.middle,
            Scouts.name,
            Troops.name.label("trp_name"),
            Scouts.memo,
        )
        .where(Scouts.id == scoutId)
        .join(Troops, Troops.id == Scouts.belong)
        .all()
    )
    waslist = whatScoutWas(scoutId)
    return render_template(
        "scouts/scout.html",
        scout=scout[0],
        was=waslist,
    )


@app.route("/scouts/create/<scoutId>", methods=["GET"])
def scoutCreate(scoutId):
    scout = Scouts.query.get(scoutId)
    tps = db.session.query(Troops).all()
    return render_template(
        "scouts/create.html",
        p=scout,
        trp=tps,
        scoutid=scoutId,
        waslist=whatScoutWas(scoutId),
    )
