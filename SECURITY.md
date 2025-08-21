# Security Guide

## Environment Variables Setup

This plugin requires several API keys to function properly. **Never commit actual API keys to version control.**

⚠️ **Important for Figma Plugins**: Unlike web applications, Figma plugins require API keys to be injected at build time since they run in a sandboxed environment without access to `process.env`.

### Setup Instructions

1. **Copy the environment template:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your API keys in the `.env` file:**
   - `OPENAI_API_KEY`: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
   - `CLAUDE_API_KEY`: Get from [Anthropic Console](https://console.anthropic.com/)
   - `YOUTUBE_API`: Get from [Google Console](https://console.developers.google.com/)
   - `VITE_CLERK_PUBLISHABLE_KEY`: Get from [Clerk Dashboard](https://dashboard.clerk.com/)
   - `DO_SECRET`: Get from [Digital Ocean](https://cloud.digitalocean.com/account/api/)

3. **Verify your setup:**
   ```bash
   npm run build
   ```

## Security Features

### 1. Environment Variable Validation
- The plugin validates all required environment variables on startup
- Missing variables trigger warnings in the console
- AI functions gracefully handle missing keys with error messages

### 2. Build-time Security Checks
- Automated scanning of build files for exposed API keys
- Distinguishes between expected environment injection and hardcoded secrets
- Build fails only if hardcoded keys are detected in source code
- Multiple key patterns detected (OpenAI, Anthropic, Google, Clerk, etc.)
- ✅ **Expected**: API keys from environment variables in build files
- ❌ **Violation**: Hardcoded API keys in source code

### 3. Development Safety
- `.env` file is automatically ignored by git
- `envConfig.ts` is ignored by git (contains no secrets)
- Separate `build:unsafe` command for emergency builds

## Security Commands

```bash
# Build with security check (recommended)
npm run build

# Build without security check (emergency only)
npm run build:unsafe

# Run security check on existing build
npm run security-check
```

## Best Practices

1. **Never hardcode API keys** in source files
2. **Use environment variables** for all sensitive data
3. **Run security checks** before deploying
4. **Rotate API keys** regularly
5. **Monitor API usage** for unexpected activity

## Troubleshooting

### Build fails with "API keys found in build files"
- Check that you're using `process.env.VARIABLE_NAME` syntax
- Ensure no hardcoded keys in source code
- Verify `.gitignore` includes environment files

### "Missing environment variables" warning
- Copy `.env.example` to `.env`
- Fill in all required API keys
- Rebuild the plugin with `npm run build`

### AI functions not working
- Verify API keys are set in `.env`
- Check console for specific error messages
- Ensure API keys have proper permissions