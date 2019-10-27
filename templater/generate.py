from pathlib import Path
import re

from make_page import makePage

pages = []
with open("pages/layout.html") as layoutFile:
    for filename in Path('pages/views/').glob('**/*.html'):
        if not re.findall(R'partial|layout', str(filename)):
            newFileName = str(filename)[12:]
            with open(filename) as file:
                pages.append([newFileName, makePage(file, layoutFile, None, True, False)])

print ("Writing pages")
for page in pages:
    with open(page[0], 'w') as outFile:
        print ("Writing: ", page[0])
        outFile.write(page[1].html)