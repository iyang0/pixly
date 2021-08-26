from app import app
from models import db, Image
import os
import boto3

BUCKET_NAME = os.getenv('BUCKET_NAME')

# Create all tables
db.drop_all()
db.create_all()

# Create test data

s3 = boto3.resource('s3')
my_bucket = s3.Bucket(BUCKET_NAME)
images = []
for bucket_object in my_bucket.objects.all():
    images.append( Image( 
        title=bucket_object.key,
        path=f"https://s3.us-west-1.amazonaws.com/{BUCKET_NAME}/{bucket_object.key}",
        filename=bucket_object.key
    ))

# print(images)

# cat1 = Image(title="cat1", path="https://i.imgur.com/x2Xf5nj.jpeg", filename="x2Xf5nj.jpeg")
# cat2 = Image(title="cat2", path="https://i.imgur.com/O6SqEc1.jpeg", filename="O6SqEc1.jpeg")

db.session.add_all(images)
db.session.commit()