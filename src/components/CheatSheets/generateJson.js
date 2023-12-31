const fs = require("fs").promises;
const path = require("path");

async function createJson(directory, outputDir, outputFile) {
    const data = {};
    const assetsDir = path.join(outputDir, "assets");

    async function traverseFolder(currentDir) {
        try {
            const files = await fs.readdir(currentDir);
            const folderName = path.basename(currentDir);
            data[folderName] = [];

            for (const file of files) {
                const filePath = path.join(currentDir, file);
                const stats = await fs.stat(filePath);

                if (stats.isDirectory()) {
                    await traverseFolder(filePath);
                } else {
                    if (path.extname(file) === ".md") {
                        let fileContent = await fs.readFile(filePath, "utf8");

                        // Check for local images in markdown content and update their paths
                        fileContent = fileContent.replace(/!\[.*?\]\((.*?)\)/g, async (match, imagePath) => {
                            if (!imagePath.startsWith("https")) {
                                const imageFileName = path.basename(imagePath);
                                const newImagePath = path.join(assetsDir, imageFileName);

                                if (
                                    await fs
                                        .access(path.join(currentDir, imagePath))
                                        .then(() => true)
                                        .catch(() => false)
                                ) {
                                    const imageData = await fs.readFile(path.join(currentDir, imagePath));
                                    await fs.mkdir(assetsDir, { recursive: true });
                                    await fs.writeFile(newImagePath, imageData);
                                    return `![${imageFileName}](/src/components/CheatSheets/${outputDir}/assets/${imageFileName})`;
                                } else {
                                    console.error(`Image not found: ${imagePath}`);
                                    return match; // Return the original match for missing images
                                }
                            } else {
                                return match; // Return the original match for external images
                            }
                        });

                        data[folderName].push({ [file]: fileContent });
                    } else if (path.extname(file).match(/\.(jpg|jpeg|png|gif)$/i)) {
                        // Move the image to the assets folder
                        const imageFileName = path.basename(file);
                        const newImagePath = path.join(assetsDir, imageFileName);
                        const imageData = await fs.readFile(filePath);
                        await fs.mkdir(assetsDir, { recursive: true });
                        await fs.writeFile(newImagePath, imageData);
                    }
                }
            }
        } catch (error) {
            console.error("Error while traversing folder:", error);
        }
    }

    await traverseFolder(directory);

    const jsonContent = JSON.stringify(data, null, 2);
    await fs.writeFile(path.join(outputDir, `${outputFile}.json`), jsonContent);
}

// Replace 'your_folder_path' with the path to your folder
createJson("./HackBook/HackBookFiles", "HackBook/HackBookData", "hackbook");
createJson("./SecureBook/SecureBookFiles", "SecureBook/SecureBookData", "securebook");
