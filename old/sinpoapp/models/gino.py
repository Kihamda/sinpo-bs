from sinpoapp import db


class Took(db.Model):
    __tablename__ = "joined"
    id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )  # システムで使う番号
    person = db.Column(db.Integer, nullable=False)  # Who
    kind = db.Column(db.Integer, nullable=False)  # What
    date = db.Column(db.Date, nullable=False)  # When
    kousa = db.Column(db.String(255))  # who approved
    memo = db.Column(db.String(255))  # メモ


class Ginosho(db.Model):
    __tablename__ = "ginosho"
    id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )  # ��ステムで使う番号
    name = db.Column(db.String(255), nullable=False)  # ���
    reqkousa = db.Column(db.Boolean, nullable=False)
    memo = db.Column(db.String(255))
