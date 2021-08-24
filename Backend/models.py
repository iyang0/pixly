"""Models for pixly app"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Image(db.Model):
    """Image table"""

    __tablename__ = "images"

    id = db.Column( db.Integer,
        primary_key=True,
        autoincrement=True)

    name = db.Column( db.Text,
        nullable=False)

    filename = db.Column( db.Text,
        nullable=False)

    path = db.Column( db.Text,
        nullable=False)
    
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)