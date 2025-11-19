---
applyTo: 'src/background/**/*.ts'
excludeAgent: ['code-review']
---

# Background Service Worker Instructions

The background service worker is the heart of the extension's state management and message routing.

## Key Rules

1. **NO in-memory state** - Always use `chrome.storage.session` for persistence
2. **Message handlers must be async** - All handlers return `MessageResponse`
3. **Global action counter** - Maintain `state.actionCounter` for sequential IDs
4. **Tab tracking** - Track `state.currentTabId` for active recording
5. **Error handling** - Always wrap in try-catch and return error responses

## State Structure

```typescript
interface BackgroundState {
  isRecording: boolean;
  isPaused: boolean;
  testName: string;
  recordingId: string;
  startTime: number;
  currentTabId: number | null;
  actionCounter: number;
  actionCache: Action[];
  accumulatedActions: Action[];
}
```

## Message Handler Pattern

```typescript
async function handleMessage(message: Message, sender: chrome.runtime.MessageSender) {
  try {
    switch (message.type) {
      case 'YOUR_TYPE':
        // 1. Validate input
        // 2. Update state
        // 3. Persist to storage
        // 4. Return success response
        return { success: true, data: result };
      default:
        return { success: false, error: 'Unknown message type' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}
```

## Critical Functions

- `loadState()` - Restore state from storage on startup
- `saveState()` - Persist state to storage
- `handleSyncAction()` - Assign sequential IDs to actions
- `handleNavigation()` - Merge actions on page transitions

## Testing

Background logic is integration-heavy. When modifying:

- Test state persistence across service worker restarts
- Verify action ID continuity across page navigation
- Test concurrent message handling
- Mock `chrome.storage.session` in tests

## Common Pitfalls

❌ Storing state in memory (service worker can restart)
❌ Not awaiting storage operations
❌ Forgetting to increment actionCounter
❌ Not handling sender.tab?.id properly
✅ Always use chrome.storage.session
✅ Await all async operations
✅ Validate message payloads
✅ Return proper MessageResponse
