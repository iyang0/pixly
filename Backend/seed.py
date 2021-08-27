from app import app, getExifDict
from models import db, Image
import os
import boto3
import requests
from PIL import Image as Pillow
import io
from dateutil import parser

BUCKET_NAME = os.getenv('BUCKET_NAME')

# Create all tables
db.drop_all()
db.create_all()

# Create test data

s3 = boto3.resource('s3')
my_bucket = s3.Bucket(BUCKET_NAME)
images = []
for bucket_object in my_bucket.objects.all():
    image_path=f"https://s3.us-west-1.amazonaws.com/{BUCKET_NAME}/{bucket_object.key}"
    response = requests.get(image_path)
    image = Pillow.open(io.BytesIO(response.content))
    exif_dict = getExifDict(image)
    image_date = parser.parse(exif_dict.get("DateTime")) if exif_dict.get("DateTime") else None
    images.append( Image( 
        title=bucket_object.key,
        path=image_path,
        filename=bucket_object.key,
        Make=exif_dict.get("Make"),
        Model=exif_dict.get("Model"),
        Software=exif_dict.get("Software"),
        DateTime=image_date
    ))

# print(images)

# cat1 = Image(title="cat1", path="https://i.imgur.com/x2Xf5nj.jpeg", filename="x2Xf5nj.jpeg")
# cat2 = Image(title="cat2", path="https://i.imgur.com/O6SqEc1.jpeg", filename="O6SqEc1.jpeg")

db.session.add_all(images)
db.session.commit()