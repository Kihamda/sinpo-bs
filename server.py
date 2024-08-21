from sinpoapp import app, db, scouts
import webbrowser
import os

if __name__ == "__main__":
    if not os.path.exists("instance\\scout.db"):
        with app.app_context():
            db.create_all()
            with open("settings\\db_default\\troop.txt", encoding="utf-8") as f:
                for line in f:
                    tmp = line.split(",")
                    db.session.add(scouts.Troops(name=tmp[0], short=tmp[1]))
                db.session.commit()

    app.run()
