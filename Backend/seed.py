from app import app
from models import db, Image

# Create all tables
db.drop_all()
db.create_all()

# Create test data

cat1 = Image(name="cat1", path="https://i.imgur.com/x2Xf5nj.jpeg", filename="x2Xf5nj")
cat2 = Image(name="cat2", path="https://i.imgur.com/O6SqEc1.jpeg", filename="O6SqEc1")

db.session.add_all([cat1, cat2])
db.session.commit()