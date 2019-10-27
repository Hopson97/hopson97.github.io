class Page:
    def __init__(self, variables = {}, fname = ""):
        self.fname = fname
        self.variables = variables
        self.html = ""

    def addVar(self, name, value):
        self.variables[name] = value
