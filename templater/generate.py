from pathlib import Path
import re

class HtmlLine:
    def __init__(self):
        self.vars = {}

class Page:
    def __init__(self, variables = {}):
        self.variables = variables
        self.html = []

    def addVar(self, name, value):
        self.variables[name] = value

pages = []

for filename in Path('pages/views/').glob('**/*.html'):
    print(filename)
    with open(filename) as file:
        page = Page()
        for line in file:
            html = HtmlLine()
            line = line.lstrip()
            if line.startswith("-"):
                line = line[1:]
                if line.startswith("set"):
                    variableName = line.split()[1]
                    variableValue = " ".join(line.split()[2:])
                    page.addVar(variableName, variableValue)
            else:
                vars = re.findall(R"\{\{.+\}\}", line)
                renders = re.findall(R"\(\(.+\)\)", line)
                




        pages.append(page)
        print(page.html)

#with open('pages/layout.html') as f:
#    for line in f:
#        print(line)
