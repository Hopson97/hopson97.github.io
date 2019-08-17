from pathlib import Path
import re

_HTML = 0
_VAR = 1
_RENDER = 2

_REG_VARS = re.compile(R"\{\{.+\}\}")
_REG_REPL = re.compile(R"\(\(.+\)\)")

class HtmlLine:
    def __init__(self):
        self.vars = {}

class Page:
    def __init__(self, variables = {}):
        self.variables = variables
        self.html = ""

    def addVar(self, name, value):
        self.variables[name] = value

pages = []

with open("pages/layout.html") as layoutFile:
    def makePage(file, parentPage = None, loadLayout = False, isLayoutFile = False):
        page = Page()
        if parentPage:
            page.variables = parentPage.variables

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
                vars = re.findall(_REG_VARS, line)
                variableReplacments = []
                for var in vars:
                    variableName = re.sub(R"\{\{|}\}", '', var)
                    variableReplacments.append([var, page.variables[variableName]])
                for replacement in variableReplacments:
                    line = re.sub(replacement[0], replacement[1], line)

                subPages = re.findall(_REG_REPL, line)
                for subPage in subPages:
                    print("page name", subPage)
                    fileName = re.sub(R"\(\(|\)\)", '', line).rstrip()
                    if isLayoutFile and re.findall("main", fileName):
                        line = re.sub(R"\(\(main\)\)", parentPage.html, line)
                    else:
                        with open("pages/" + fileName + ".html") as subFile:
                            subFileContent = makePage(subFile, page)
                            line = re.sub(R"\(\("+ fileName + "\)\)", subFileContent.html, line)


                page.html += line
        if loadLayout:
            layout = makePage(layoutFile, page, False, True)
            return layout
        return page

    for filename in Path('pages/views/').glob('**/*.html'):
        if not re.findall(R'partial|layout', str(filename)):
            print(str(filename)[12:])
            with open(filename) as file:
                pages.append(makePage(file, None, True))
               # newFileName = 

for p in pages:
    print ("PAGE:", p.html)

#with open('pages/layout.html') as f:
#    for line in f:
#        print(line)
