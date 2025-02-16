module.exports = {
    php: process.platform === "win32" ?
        "C:\\xampp\\php\\php.exe" // For Windows
        :
        "/usr/bin/php" // For macOS/Ubuntu
};