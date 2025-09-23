# EduTools - Educational Tools Web Application

EduTools is a SvelteKit-based web application that provides various educational tools and utilities. It's built with TypeScript, Svelte 5, and TailwindCSS, packaged as a static site using Vite.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap, Build, and Test the Repository

**CRITICAL: NEVER CANCEL builds or long-running commands. Wait for ALL builds and commands to finish.**

1. **Install Dependencies:**

   ```bash
   npm install -g pnpm
   pnpm install
   ```

   - Takes approximately 15-20 seconds
   - May show warnings about build scripts - this is normal
   - NEVER CANCEL: Set timeout to 5+ minutes for safety

2. **Build the Application:**

   ```bash
   pnpm run build
   ```

   - **NEVER CANCEL: Build takes 35-40 seconds. Set timeout to 10+ minutes.**
   - Builds both SSR bundle and static client files
   - Outputs to `.svelte-kit/output/` and `build/` directories
   - May show tsconfig warnings - these are non-critical

3. **Development Server:**

   ```bash
   pnpm run dev
   ```

   - Starts Vite development server on http://localhost:5173/
   - Ready in ~2 seconds with hot reloading
   - Use Ctrl+C to stop

4. **Production Preview:**

   ```bash
   pnpm run preview
   ```

   - Serves production build on http://localhost:4173/
   - Must run `pnpm run build` first
   - Use Ctrl+C to stop

### Code Quality and Validation

**Always run these commands before committing changes:**

1. **Format Code:**

   ```bash
   pnpm run format
   ```

   - Uses Prettier to format all files
   - Takes ~3-5 seconds

2. **Lint Code:**

   ```bash
   pnpm run lint
   ```

   - **NEVER CANCEL: Takes 5-10 seconds. Set timeout to 2+ minutes.**
   - Checks code formatting with Prettier
   - Must pass for CI to succeed

3. **Type Check:**

   ```bash
   pnpm run check
   ```

   - **NEVER CANCEL: Takes 15-20 seconds. Set timeout to 5+ minutes.**
   - Runs svelte-kit sync and svelte-check
   - Validates TypeScript and Svelte component types

## Validation Scenarios

**ALWAYS test these scenarios after making changes:**

### Manual Functionality Testing

1. **Homepage Navigation:**
   - Visit http://localhost:5173/ (dev) or http://localhost:4173/ (preview)
   - Verify all tool links work: Calculator, Converter, Rich Text Editor, Word Counter, Password Generator, Random Number Generator, Stopwatch & Timer
   - Test navigation between tools

2. **Tool Functionality Testing:**
   - **Calculator:** Perform basic arithmetic operations (add, subtract, multiply, divide)
   - **Word Counter:** Enter text and verify word/character counts update
   - **Password Generator:** Generate passwords with different options
   - **Random Number Generator:** Generate numbers within specified ranges
   - **Stopwatch & Timer:** Start/stop/reset functionality

3. **Game Functionality (if accessing /g route):**
   - Navigate to games section
   - Verify games load and are interactive
   - Test game selection and switching

### Build Validation

1. **Production Build Test:**

   ```bash
   pnpm run build && pnpm run preview
   ```

   - Verify build completes without errors
   - Test production site functionality
   - Check that all assets load correctly

2. **CI Validation Commands:**

   ```bash
   pnpm run format && pnpm run lint && pnpm run check
   ```

   - All must pass for CI to succeed
   - Run before every commit

## Environment Requirements

### Required Environment Variables

Create a `.env` file based on `.env.example`:

```bash
CONVEX_DEPLOYMENT=dev:something
PUBLIC_CONVEX_URL=https://something.convex.cloud
```

### System Dependencies

- Node.js (v18+ recommended)
- pnpm (latest version)
- No additional system dependencies required

## Key Project Structure

### Important Directories

- `src/routes/` - SvelteKit routes and pages
- `src/routes/tools/` - Educational tool implementations
- `src/lib/` - Shared components and utilities
- `static/` - Static assets and legacy game files
- `static/_app/tools/` - Legacy educational games and tools
- `.github/workflows/` - CI/CD automation
- `ci/scripts/` - GitHub automation scripts

### Configuration Files

- `package.json` - Dependencies and scripts
- `svelte.config.js` - SvelteKit configuration (uses adapter-static)
- `vite.config.ts` - Vite build configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - TailwindCSS configuration

## CI/CD Workflows

### GitHub Actions (.github/workflows/)

1. **build.yml** - Builds project on pull requests (uses Arch Linux container)
2. **format.yml** - Auto-formats code with Prettier
3. **deploy.yml** - Deployment workflow
4. **production_deploy.yml** - Moves project items to production status
5. **issue.yml** - Automated issue processing

### CI Automation Scripts (ci/scripts/)

- `issue.py` - Processes GitHub issues, especially game requests
- `move_to_production.py` - Moves project board items from "Done" to "In Production"
- `test_production_move.py` - Manual testing for production moves

## Common Development Tasks

### Adding New Educational Tools

1. Create new route in `src/routes/tools/[tool-name]/`
2. Add `+page.svelte` with tool implementation
3. Update tools list in `src/routes/+page.svelte`
4. Test functionality thoroughly
5. Run validation commands before committing

### Working with Existing Games/Tools

- Legacy games are in `static/_app/tools/`
- Modern tools are in `src/routes/tools/`
- Always test both development and production builds

### Debugging Build Issues

1. Check for missing environment variables
2. Verify all imports are correct (case-sensitive)
3. Run `pnpm run check` for TypeScript issues
4. Clear `.svelte-kit` folder and rebuild if needed

## Performance Notes

- Build artifacts can be large (~MB range for client bundle)
- Static files in `static/` directory are served as-is
- TailwindCSS is optimized and purged in production builds
- Svelte components are compiled to efficient JavaScript

## Security Considerations

- Uses Clerk for authentication (when configured)
- Report security issues via GitHub Security Advisories
- Environment variables contain sensitive keys - never commit .env files
- Static games/tools should be reviewed for security if user-generated content is involved

## Common Errors and Solutions

1. **"Cannot find base config file" warning:** Normal during build, safe to ignore
2. **Build scripts warnings during pnpm install:** Normal, packages still install correctly
3. **TypeScript errors:** Run `pnpm run check` to validate and see detailed errors
4. **Format failures:** Run `pnpm run format` to auto-fix, then `pnpm run lint` to verify

**Remember: Always run the complete validation workflow (format, lint, check, build) before considering your changes complete.**
