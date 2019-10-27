from pathlib import Path
import re

from make_page import makePage

pages = []
for filename in Path('pages/views/').glob('**/*.html'):
    with open("pages/layout.html") as layoutFile:
        if not re.findall(R'partial|layout', str(filename)):
            newFileName = str(filename)[12:]
            with open(filename) as file:
                pages.append([newFileName, makePage(file, layoutFile, None, True, False)])

for page in pages:
    with open(page[0], 'w') as outFile:
        outFile.write(page[1].html)