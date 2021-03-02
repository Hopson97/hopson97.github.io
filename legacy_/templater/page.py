class Page:
    def __init__(self, variables = {}, fname = ""):
        self.fname = fname
        self.variables = variables
        self.html = ""

    def addScript(self, name):
        self.html +=        \
            "<script src='/assets/scripts/" + name + ".js'></script>"


    def addVar(self, name, value):
        self.variables[name] = value
