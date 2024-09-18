from sinpoapp import app
from flask import render_template


@app.route("/export")
def export():
    return render_template("export.html", title="データエクスポート")
