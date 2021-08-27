"""pixly backend, JSON API"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, connect_db, Image
from PIL import Image as Pillow
from PIL.ExifTags import TAGS
import base64
import io
import os
import boto3
import requests
from dotenv import load_dotenv
from dateutil import parser


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

    image_data = base64.b64decode(data)
    image_bytes = io.BytesIO(image_data)
    # io.BytesIO turns the decoded string into a bytes str
    s3.Bucket(BUCKET_NAME).put_object(
        Key=filename, 
        ContentType="image/jpeg", 
        Body=image_bytes, 
        ACL="public-read")

    exifDict = getExifDict(image_bytes)

    image_date = parser.parse(exifDict.get("DateTime")) if exifDict.get("DateTime") else None
    
    image_path=f"https://s3.us-west-1.amazonaws.com/{BUCKET_NAME}/{filename}"

    newImage = Image(
      title=title, 
      path=image_path, 
      filename=filename,
      Make=exifDict.get("Make"),
      Model=exifDict.get("Model"),
      Software=exifDict.get("Software"),
      DateTime=image_date
      )
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


def getExifDict(imageBinary):
    image = Pillow.open(imageBinary)
    exifdata = image.getexif()

    # iterating over all EXIF data fields
    exifDict = {}
    for tag_id in exifdata:
        # get the tag name, instead of human unreadable tag id
        tag = TAGS.get(tag_id, tag_id)
        data = exifdata.get(tag_id)
        # decode bytes 
        if isinstance(data, bytes):
            data = data.decode()
        exifDict[tag] = data
    print(exifDict)
    return exifDict

@app.route('/test', methods=["GET"])
def search_image_data(search_term="hubble-space.jpeg"):
    from sqlalchemy import or_
    images = Image.query\
            .filter(
                    or_(
                        Image.title.like('%'+search_term+'%'),
                        Image.filename.like('%'+search_term+'%'),
                        Image.Make.like('%'+search_term+'%'),
                        Image.Model.like('%'+search_term+'%'),
                        Image.Software.like('%'+search_term+'%'),
                        Image.DateTime.like('%'+search_term+'%')
                        )
                    ).order_by(Image.id.desc())
    
    return jsonify({ "images": [image.serialize() for image in images] }), 200