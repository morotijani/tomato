const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Create a custom resolver to intercept node:sea without caching invalid Windows paths
const originalResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
    // Catch node:sea and node:crypto specifically for Windows compatibility
    if (moduleName === 'node:sea') {
        return {
            filePath: require.resolve('./node-sea-shim.js'),
            type: 'sourceFile',
        };
    }

    if (moduleName === 'node:crypto') {
        return {
            filePath: require.resolve('expo-crypto'),
            type: 'sourceFile',
        };
    }

    // Chain to original resolver if it exists
    if (originalResolveRequest) {
        return originalResolveRequest(context, moduleName, platform);
    }

    // Default behavior
    return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
