from sinpoapp import app
from flask import render_template


@app.route("/scouts", methods=["GET", "POST"])
def scouts():
    scoutsList = []
    for i in range(1000):
        scoutsList.append({"id": i + 1, "name": "佐藤 花子", "belong": "ボーイ隊"})
    return render_template("scouts.html", title="スカウト一覧", list=scoutsList)
