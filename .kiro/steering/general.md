# General Steering Guidelines for Kiro

This document provides additional guidance for AI assistance throughout the DOWN platformer project.

---

## Code Style & Conventions

### TypeScript Best Practices
- Always use explicit types for function parameters and return values
- Prefer interfaces over type aliases for object shapes
- Use const assertions where appropriate
- Avoid `any` type - use `unknown` if type is truly unknown
- Enable and respect strict mode settings

### Code Organization
- Keep files focused and single-purpose
- Extract reusable logic into utility functions
- Group related functionality together
- Maintain clear separation between game logic and UI components

### Naming Conventions
- Use descriptive, self-documenting names
- Boolean variables should start with `is`, `has`, `should`, etc.
- Event handlers should start with `handle` or `on`
- Constants should be in UPPER_SNAKE_CASE if truly constant
- Avoid abbreviations unless widely understood

### Comments & Documentation
- Write comments for "why", not "what"
- Document complex algorithms or non-obvious logic
- Add JSDoc comments for public APIs and exported functions
- Keep comments up-to-date with code changes

---

## Phaser-Specific Guidelines

### Scene Management
- Each scene should have a clear, single responsibility
- Use scene data to pass information between scenes
- Clean up resources in scene shutdown methods
- Avoid storing game state in scene properties when possible

### Entity Design
- Extend Phaser classes (Sprite, GameObject) for game entities
- Keep entity logic self-contained
- Use Phaser's built-in physics system
- Implement proper cleanup in destroy methods

### Performance Considerations
- Reuse objects instead of creating/destroying frequently
- Use object pools for frequently spawned entities
- Optimize collision detection with groups and layers
- Profile performance regularly during development

---

## Development Workflow

### Before Starting New Features
1. Review the game-flow-and-mechanics.md specification
2. Check objectives.md for current phase and priorities
3. Understand how the feature fits into the overall architecture
4. Plan the implementation approach

### During Development
- Write minimal, focused code that solves the immediate problem
- Test incrementally - don't build everything before testing
- Use `pnpm dev` to see changes in real-time
- Check browser console for errors and warnings

### After Implementation
- Test the feature thoroughly in the browser
- Update objectives.md to mark completed tasks
- Document any learnings in takeaway.md
- Consider edge cases and error handling

---

## Testing & Debugging

### Manual Testing Checklist
- Test all keyboard controls (W/A/S/D and arrow keys)
- Verify scene transitions work correctly
- Check collision detection accuracy
- Test edge cases (falling off platforms, rapid inputs, etc.)
- Verify timer and score calculations

### Debugging Strategies
- Use browser DevTools console for JavaScript errors
- Enable Phaser debug mode to visualize physics bodies
- Add console.log statements strategically
- Use breakpoints for complex logic
- Check Network tab for API issues

### Common Issues
- Phaser not loading: Check webpack config in next.config.js
- Physics not working: Verify arcade physics is enabled in config
- Scene not transitioning: Check scene key names match exactly
- API errors: Verify DATABASE_URL in .env.local

---

## Database & API Guidelines

### Prisma Best Practices
- Always run `npx prisma generate` after schema changes
- Use transactions for related database operations
- Handle database errors gracefully
- Index frequently queried fields

### API Design
- Validate all inputs with Zod schemas
- Return consistent error response formats
- Use appropriate HTTP status codes
- Consider rate limiting for public endpoints

### Security Considerations
- Never expose sensitive data in API responses
- Validate and sanitize all user inputs
- Use environment variables for secrets
- Implement proper error handling without leaking details

---

## Git & Version Control

### Commit Messages
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove, etc.)
- Reference issue numbers if applicable
- Keep commits focused on single changes

### Branching Strategy
- Use feature branches for new features
- Keep main branch stable and deployable
- Merge frequently to avoid conflicts
- Delete branches after merging

---

## Communication & Collaboration

### When Asking for Help
- Provide context about what you're trying to achieve
- Share relevant code snippets or error messages
- Describe what you've already tried
- Be specific about the problem

### When Providing Feedback
- Be constructive and specific
- Suggest alternatives when pointing out issues
- Acknowledge what works well
- Focus on the code, not the person

---

## Project-Specific Reminders

### Game Design Principles
- Prioritize player experience and fun
- Keep controls responsive and intuitive
- Provide clear feedback for player actions
- Balance challenge with accessibility

### Scope Management
- Focus on core mechanics before polish
- Complete one phase before moving to the next
- Resist feature creep - stick to the specification
- Document future ideas in objectives.md Future Enhancements

### Quality Standards
- Code should be readable and maintainable
- Features should be tested before marking complete
- Performance should be acceptable on target devices
- User experience should be smooth and bug-free

---

## Helpful Resources

### Documentation Links
- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Quick Reference
- Game dimensions: 800x600 pixels
- Gravity: 800 pixels/second²
- Player health: 3 hit points
- Timer format: MM:SS.mmm

---

## Notes for Kiro

### Preferred Approach
- Provide concise, actionable suggestions
- Explain the reasoning behind recommendations
- Offer alternatives when appropriate
- Focus on teaching, not just solving

### Code Generation
- Generate minimal, focused code
- Include necessary imports and types
- Add brief comments for complex logic
- Follow project conventions and patterns

### Problem Solving
- Break down complex problems into smaller steps
- Consider edge cases and error scenarios
- Suggest testing strategies
- Think about maintainability and extensibility

---

**Last Updated**: Initial creation
**Review Frequency**: Update as project evolves and new patterns emerge
