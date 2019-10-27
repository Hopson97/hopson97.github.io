from pathlib import Path
import re

from make_page import makePage

print()
print("Reading pages")
pages = []
for filename in Path('pages/views/').glob('**/*.html'):
    with open("pages/layout.html") as layoutFile:
        if not re.findall(R'partial|layout', str(filename)):
            newFileName = str(filename)[12:]
            with open(filename) as file:
                print ("Making", filename)
                pages.append([newFileName, makePage(file, layoutFile, None, True, False)])

print()
print("Writing pages")
for page in pages:
    with open(page[0], 'w') as outFile:
        print ("Writing: ", page[0])
        outFile.write(page[1].html)