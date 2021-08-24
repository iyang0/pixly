"""pixly backend, JSON API"""

from flask import Flask, request, jsonify
from models import db, connect_db, Image
import os
# from dotenv import load_dotenv

# load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pixly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

connect_db(app)
db.create_all()

# app.config['SECRET_KEY'] = os.environ.get(".env")
app.config['SECRET_KEY'] = "This is a secret key"


@app.route('/images', methods=["GET"])
def get_images():
    """returns a list of image objects,
    the objects contain image metadata and URL"""
    images = Image.query.all()
    

    return jsonify({ "images": [image.serialize() for image in images] }), 200


@app.route('/images/<id>', methods=["GET"])
def get_image(id):
    """return the details of a single image"""
    image = Image.query.get_or_404(id)

    return jsonify(image.serialize()), 200


@app.route('/images', methods=["POST"])
def add_image():
    """Creates a new image in the db, returns the new image object
    the objects contain image metadata and URL"""
    
    image = Image()




    return jsonify(image.serialize()), 201


@app.route('/images/<id>', methods=["PATCH"])
def update_image(id):
    """patches an existing image in the db, returns the new image object
    the objects contain image metadata and URL"""
    return {}