---
applyTo: 'src/content/**/*.ts'
excludeAgent: ['code-review']
---

# Content Scripts Instructions

Content scripts run in the context of web pages and capture user interactions.

## Key Rules

1. **Stateless design** - No persistent state in content scripts
2. **Message passing** - Always communicate with background via `chrome.runtime.sendMessage`
3. **Event cleanup** - Remove all event listeners when recording stops
4. **Element filtering** - Don't record clicks on extension's own overlay
5. **Selector generation** - Generate multiple selector strategies for reliability

## Architecture

```
content/
├── index.ts              # Entry point, message router
├── action-recorder.ts    # Core recording orchestrator
├── event-listener.ts     # DOM event capture
├── recording-indicator.ts # Overlay UI (pause/resume/stop)
└── selector-generator.ts  # Multi-selector generation
```

## Event Listener Pattern

```typescript
class EventListener {
  private handleClick = (event: MouseEvent) => {
    // 1. Check if should record (not extension overlay)
    // 2. Extract element and event data
    // 3. Generate selectors
    // 4. Create action object
    // 5. Call callback with action
  };

  start() {
    // Use capture phase for early interception
    document.addEventListener('click', this.handleClick, true);
  }

  stop() {
    // Always clean up
    document.removeEventListener('click', this.handleClick, true);
  }
}
```

## Selector Generation Priority

1. `id` attribute (most reliable)
2. `data-testid` or `data-test`
3. CSS class combination
4. ARIA labels (`aria-label`, `aria-labelledby`)
5. XPath
6. Text content (least reliable)

Always generate ALL selector types and let the consumer choose based on priority.

## Action Syncing

```typescript
// Send to background for ID assignment
chrome.runtime.sendMessage(
  {
    type: 'SYNC_ACTION',
    payload: { action },
  },
  (response) => {
    if (response?.success) {
      // Action saved with sequential ID
    }
  }
);
```

## Overlay UI Guidelines

- Position: fixed, top-right
- z-index: 2147483647 (maximum)
- Filter out overlay clicks: `if (element.closest('#saveaction-recording-indicator')) return;`
- Use shadow DOM to avoid style conflicts (future enhancement)

## Testing Content Scripts

Content scripts interact with DOM. When testing:

- Mock `chrome.runtime.sendMessage`
- Use JSDOM for DOM testing
- Test event listener cleanup
- Verify selector generation accuracy
- Test cross-origin iframe handling (if applicable)

## Common Pitfalls

❌ Recording clicks on extension's own UI
❌ Not cleaning up event listeners
❌ Storing state in content script (use background)
❌ Generating only one selector type
❌ Not handling navigation properly
✅ Filter extension overlay elements
✅ Remove listeners on stop
✅ Keep content scripts stateless
✅ Generate multiple selectors
✅ Sync actions immediately to background
