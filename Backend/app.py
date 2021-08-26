"""pixly backend, JSON API"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, connect_db, Image
# import PIL
import base64
import io
import os
import boto3
from dotenv import load_dotenv


s3 = boto3.resource('s3')
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///pixly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = False

load_dotenv()
BUCKET_NAME = os.getenv('BUCKET_NAME')

CORS(app)
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

    image_binary = request.json.get("img")
    filename = request.json.get("filename")
    title = request.json.get("title")

    if 'data:' in image_binary and ';base64,' in image_binary:
        # Break out the header from the base64 content
        data = image_binary.split(';base64,')[1]
    else:
        return jsonify({400: "The file sent was not a valid image"}), 400

    image = base64.b64decode(data)
    # io.BytesIO turns the decoded string into a bytes str
    s3.Bucket(BUCKET_NAME).put_object(
        Key=filename, 
        ContentType="image/jpeg", 
        Body=io.BytesIO(image), 
        ACL="public-read")

    newImage = Image(title=title, path=f"https://s3.us-west-1.amazonaws.com/{BUCKET_NAME}/{filename}", filename=filename)
    db.session.add(newImage)
    db.session.commit()
    
    return jsonify({"image" : Image.serialize(newImage)}), 201


@app.route('/images/<id>', methods=["PATCH"])
def update_image(id):
    """patches an existing image in the db, returns the new image object
    the objects contain image metadata and URL"""
    return {}

@app.errorhandler(404)
def page_not_found(e):
    return jsonify({e.code:e.description}), 404