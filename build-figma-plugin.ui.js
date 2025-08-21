const fs = require('fs');
const path = require('path');

// Load environment variables
function loadEnvVariables() {
  const envPath = path.join(__dirname, '.env');
  const envVars = {};
  
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    
    lines.forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          envVars[key.trim()] = value.trim();
        }
      }
    });
  } catch (error) {
    console.warn('Warning: Could not load .env file:', error.message);
    console.warn('Environment variables will not be available in the plugin.');
  }
  
  return envVars;
}

module.exports = function (buildOptions) {
  const envVars = loadEnvVariables();
  
  // Create process.env replacement with only our needed variables
  const processEnvDefines = {};
  ['YOUTUBE_API', 'DO_SECRET', 'VITE_CLERK_PUBLISHABLE_KEY', 'OPENAI_API_KEY', 'CLAUDE_API_KEY'].forEach(key => {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(envVars[key] || '');
  });
  
  return {
    ...buildOptions,
    define: {
      global: 'window',
      // Define process.env variables at build time
      ...processEnvDefines
    }
  }
}
