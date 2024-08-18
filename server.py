from sinpoapp import app, db
import webbrowser
import os

if __name__ == "__main__":
    if not os.path.exists("instance\\scout.db"):
        with app.app_context():
            db.create_all()
    app.run()
