from app import app
from models import db, Image
import os
from dotenv import load_dotenv

load_dotenv()


BUCKET_NAME = os.getenv('BUCKET_NAME')


# Create all tables
db.drop_all()
db.create_all()

# Create test data

# cat1 = Image(name="cat1", path="https://i.imgur.com/x2Xf5nj.jpeg", filename="x2Xf5nj")
# cat2 = Image(name="cat2", path="https://i.imgur.com/O6SqEc1.jpeg", filename="O6SqEc1")

test1 = Image(name="space", path=f"https://s3.us-west-1.amazonaws.com/{BUCKET_NAME}/hubble-space.jpeg", filename="hubble-space.jpeg")
test2 = Image(name="fox", path=f"https://s3.us-west-1.amazonaws.com/{BUCKET_NAME}/howling-red-OU2vFQCwCD0-unsplash.jpg", filename="howling-red-OU2vFQCwCD0-unsplash.jpg")

db.session.add_all([test1, test2])
db.session.commit()