import shutil

src_path = '/home/lezscripts/.gemini/antigravity/brain/b873d450-24ff-4037-9180-637561b12405/media__1787465950415.png'
out_path = '/home/lezscripts/Downloads/Portfolio/public/profile.png'

shutil.copyfile(src_path, out_path)
print("COPIED_NEW_TRANSPARENT_IMAGE_SUCCESSFULLY")
