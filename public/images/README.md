# Character Images Setup

## Bear Concierge Image

The application uses an image-based bear concierge character instead of an SVG illustration for better quality and consistency.

### Quick Setup

1. **Download the bear concierge image** from [Issue #3](https://github.com/ampautsc/Concierge/issues/3)
2. **Save it as** `public/images/bear-concierge.png`
3. The application will automatically use it

### Current Status

The repository includes an SVG placeholder (`bear-concierge.svg`) that displays until you add the actual PNG image. The placeholder shows the general design but should be replaced with the high-quality image from the issue.

### File Structure

```
public/
  images/
    bear-concierge.png  <- Add the actual image here
    bear-concierge.svg  <- Placeholder (included)
    README.md           <- This file
```

### Component Usage

The `WelcomeScreen` component automatically tries to load the PNG image first, then falls back to the SVG placeholder if the PNG is not found:

```javascript
// In src/components/WelcomeScreen.jsx
const imageSrc = '/images/bear-concierge.png';
const fallbackSrc = '/images/bear-concierge.svg';
```

### For Different Poses/Settings

In the future, to add different character poses:

1. Save additional images in this directory with descriptive names:
   - `bear-concierge-welcoming.png`
   - `bear-concierge-pointing.png`
   - `bear-concierge-celebrating.png`
   - etc.

2. Update the `ConciergeAnimal` component to accept a `pose` prop:
   ```javascript
   <ConciergeAnimal pose="welcoming" />
   ```

3. This approach allows easy AI-generated character asset management.

### AI-Generated Assets

For creating consistent character images:
- Use the character design from Issue #3 as a reference
- Maintain consistent:
  - Color palette (brown bear, navy vest, red bow tie)
  - Character proportions
  - Style and detail level
- Tools: DALL-E, Midjourney, or Stable Diffusion

### Troubleshooting

**Image not showing?**
- Check that `public/images/bear-concierge.png` exists
- Verify the file name is exactly `bear-concierge.png` (case-sensitive)
- Restart the development server after adding the image
- Check browser console for 404 errors

**Wrong image displaying?**
- Clear browser cache
- Hard refresh (Ctrl+F5 or Cmd+Shift+R)
- Check the file path in browser dev tools Network tab

