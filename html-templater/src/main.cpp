#include <iostream>
#include <filesystem>
#include <fstream>
#include <sstream>
#include <regex>

namespace fs = std::filesystem;

const fs::path LAYOUT_PATH = fs::path("pages/layout.html");

namespace {
    std::string fileContents(const fs::path& path) {
        std::ifstream inFile(path);
        if (!inFile.is_open()) {
            std::cout << "Failed to open file: " << path << "\n";
			return "";
        }

		std::ostringstream stream;
		stream << inFile.rdbuf();
		return stream.str();
    }

	void scanFile(const std::string& contents) {
		const static std::regex variables("\(\(.+\)\)",std::regex_constants::ECMAScript);
		if (std::regex_search(contents, variables)) {
			std::cout << "FOUND\n";
		}
	}
} 


int main() {
    scanFile(fileContents(LAYOUT_PATH));
}
