from page import Page
import re


_HTML = 0
_VAR = 1
_RENDER = 2

_REG_VARS = re.compile(R"\{\{.+\}\}")
_REG_REPL = re.compile(R"\(\(.+\)\)")

def makePage(file, layout, parentPage = None, loadLayout = False, isLayoutFile = False, fname = ""):
    page = Page({}, fname)
    if parentPage:
        page.variables = parentPage.variables

    for line in file:
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
                fileName = re.sub(R"\(\(|\)\)", '', subPage).rstrip()
                if isLayoutFile and re.findall("main", fileName):
                    line = re.sub(R"\(\(main\)\)", parentPage.html, line)
                else:
                    with open("pages/" + fileName + ".html") as subFile:
                        subFileContent = makePage(subFile, layout, page)
                        line = re.sub(R"\(\("+ fileName + "\)\)", subFileContent.html, line)
            page.html += line

    if loadLayout:
        layout = makePage(layout, layout, page, False, True)
        return layout
    return page