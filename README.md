Frontend
(React)
  Users can view photos on the system
  -> on load of homepage or going to the list of photos page, get images
  -> display the images as a grid of images using the urls as an attribute of the `<img>` tag.

  --> click on image to get image details
  --> display EXIF data, other metadata

  Users can store a photo using an upload form
  (https://www.w3schools.com/tags/att_input_accept.asp)
  -> data gets sent to server

  Users can search up image 
  -> search by exif data (get images)

  Users can perform simple image edits
  -> resizing, changing colors with full photo filter, adding borders
  -> image editing form (probably dropdown or radio/checkboxes)

Backend
(Flask)
  get images
  -> make axios call to s3 to get all the images' urls
  -> can filter, use PostgreSQL full-text search

  get image
  -> getting the image metadata, and the image itself

  post image
  -> send the photo itself to S3
  -> get the metadata from the photo and store that to the database 

  update image
  -> get image from s3, change it according to user options, send it back to s3
  ->change the metadata in database
    (only the stuff that was changed)

  Database
  -> store metadata from the photo
    (location of photo, model of camera, etc)

  AmazonS3
  -> store of the photos