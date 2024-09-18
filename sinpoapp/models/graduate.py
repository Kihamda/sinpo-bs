from sinpoapp import db


class Joinedbs(db.Model):
    __tablename__ = "joinedbs"
    id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )  # システムで使う番号
    person = db.Column(db.Integer, nullable=False)  # Who
    kind = db.Column(db.Integer, nullable=False)  # What
    date = db.Column(db.Date, nullable=False)  # When
    memo = db.Column(db.String(255))  # メモ


class Graduate(db.Model):
    __tablename__ = "graduate"
    id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )  # システムで使う番号
    person = db.Column(db.Integer, nullable=False)  # Who
    kind = db.Column(db.Integer, nullable=False)  # What
    date = db.Column(db.Date, nullable=False)  # When
    memo = db.Column(db.String(255))  # メモ


class Graduation(db.Model):
    __tablename__ = "graduation"
    id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )  # システムで使う番号
    name = db.Column(db.String(255), nullable=False)
    kind = db.Column(db.Integer, nullable=False)


class Declare(db.Model):
    __tablename__ = "declare"
    id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )  # ��ステムで使う番号
    person = db.Column(db.Integer, nullable=False)  # What
    date = db.Column(db.Date, nullable=False)  # When
    place = db.Column(db.String(255))
    memo = db.Column(db.String(255))  # メモ
