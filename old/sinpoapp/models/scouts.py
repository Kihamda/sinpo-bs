from sinpoapp import db
from datetime import datetime


class Scouts(db.Model):
    __tablename__ = "scouts"
    id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )  # システムで使う番号
    middle = db.Column(db.String(255))  # 名字
    name = db.Column(db.String(255), nullable=False)  # 名前
    belong = db.Column(db.Integer)  # 所属隊
    wasbvs = db.Column(db.Boolean, default=False, nullable=False)  # BVS経験
    wascs = db.Column(db.Boolean, default=False, nullable=False)  # CS経験
    wasbs = db.Column(db.Boolean, default=False, nullable=False)  # BS経験
    wasvs = db.Column(db.Boolean, default=False, nullable=False)  # VS経験
    wasrs = db.Column(db.Boolean, default=False, nullable=False)  # RS経験
    wasrs = db.Column(db.Boolean, default=False, nullable=False)  # RS経験
    memo = db.Column(db.String(255))  # メモ
    created_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now
    )  # 作成日時
    updated_at = db.Column(
        db.DateTime, nullable=False, default=datetime.now, onupdate=datetime.now
    )  # 更新日時


class Troops(db.Model):
    __tablename__ = "troops"
    id = db.Column(
        db.Integer, primary_key=True, autoincrement=True
    )  # システムで使う番号
    name = db.Column(db.String(255), nullable=False)  # 名前
    short = db.Column(db.String(255), nullable=False)  # 略称
