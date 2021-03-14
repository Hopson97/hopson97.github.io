import os
from PIL import Image

from resizeimage import resizeimage

for filename in os.listdir("./"):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        with open(filename, 'r+b') as f:
            with Image.open(f) as image:
                cover = resizeimage.resize_cover(image, [1280, 720], validate=False)
                cover.save(filename, image.format)