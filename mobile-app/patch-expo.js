const fs = require('fs');
const path = require('path');

const filePath = path.join(
    __dirname,
    'node_modules/@expo/cli/build/src/start/server/metro/externals.js'
);

if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace the directory creation logic to sanitize folder names
    const patch = `
        let safeModuleId = moduleId;
        if (process.platform === 'win32') {
             safeModuleId = moduleId.replace(/:/g, '-');
        }
        const shimDir = _path.default.join(projectRoot, METRO_EXTERNALS_FOLDER, safeModuleId);
  `;

    // We look for the loop where shimDir is defined
    const targetStr = 'const shimDir = _path.default.join(projectRoot, METRO_EXTERNALS_FOLDER, moduleId);';

    if (content.includes(targetStr)) {
        content = content.replace(targetStr, patch);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Successfully patched @expo/cli for Windows node:sea compatibility.');
    } else {
        console.log('Patch target not found. File might differ from expectation.');
        // Fallback: simpler string replacement if variable names match
        content = content.replace(
            'const shimDir = _path.default.join(projectRoot, METRO_EXTERNALS_FOLDER, moduleId);',
            'const shimDir = _path.default.join(projectRoot, METRO_EXTERNALS_FOLDER, moduleId.replace(/:/g, "-"));'
        );
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Successfully patched @expo/cli with fallback method.');
    }
} else {
    console.error('Could not find externals.js to patch.');
}
