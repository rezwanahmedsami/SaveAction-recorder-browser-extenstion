---
applyTo: '**/*.ts,**/*.tsx'
---

# TypeScript Best Practices

Follow these TypeScript guidelines for type-safe development.

## Type Definitions

### Interfaces vs Types

Use **interfaces** for object shapes that might be extended:

```typescript
interface Action {
  id: string;
  type: ActionType;
  timestamp: number;
}
```

Use **type aliases** for unions, intersections, or primitives:

```typescript
type ActionType = 'click' | 'input' | 'scroll' | 'navigation';
type MessageResponse = { success: true; data: any } | { success: false; error: string };
```

### Avoid `any`

Prefer specific types or `unknown`:

```typescript
// ❌ Bad
function process(data: any) {}

// ✅ Good
function process(data: unknown) {
  if (typeof data === 'string') {
    // TypeScript knows data is string here
  }
}

// ✅ Even better
interface InputData {
  value: string;
  type: string;
}
function process(data: InputData) {}
```

### Type Guards

Use type guards for runtime type checking:

```typescript
function isClickAction(action: Action): action is ClickAction {
  return action.type === 'click';
}

if (isClickAction(action)) {
  // TypeScript knows action is ClickAction here
  console.log(action.coordinates);
}
```

### Utility Types

Use built-in utility types:

```typescript
// Partial - make all properties optional
type PartialAction = Partial<Action>;

// Pick - select specific properties
type ActionSummary = Pick<Action, 'id' | 'type'>;

// Omit - exclude specific properties
type ActionWithoutTimestamp = Omit<Action, 'timestamp'>;

// Required - make all properties required
type RequiredConfig = Required<Config>;
```

## Function Signatures

### Explicit Return Types

Always specify return types for public functions:

```typescript
// ✅ Good
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Bad (inferred return type can change unexpectedly)
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Async Functions

```typescript
async function fetchData(): Promise<Data> {
  const response = await fetch('/api/data');
  return response.json();
}
```

### Generic Functions

Use generics for reusable functions:

```typescript
function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}
```

## Chrome Extension Types

### Message Handlers

```typescript
type MessageHandler = (
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: MessageResponse) => void
) => boolean | void;
```

### Storage Operations

```typescript
async function getFromStorage<T>(key: string): Promise<T | null> {
  const result = await chrome.storage.session.get(key);
  return (result[key] as T) || null;
}
```

## Error Handling

### Custom Error Types

```typescript
class RecordingError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'RecordingError';
  }
}
```

### Type-safe Error Handling

```typescript
function parseAction(data: unknown): Action {
  if (!isValidAction(data)) {
    throw new RecordingError('Invalid action data', 'INVALID_ACTION', data);
  }
  return data;
}
```

## Module Organization

### Barrel Exports

Use `index.ts` for clean imports:

```typescript
// types/index.ts
export * from './actions';
export * from './messages';
export * from './recording';

// Usage
import { Action, Message, Recording } from '@/types';
```

### Path Aliases

Use configured path aliases:

```typescript
// ✅ Good
import { validateAction } from '@/utils/validator';
import { Action } from '@/types/actions';

// ❌ Bad
import { validateAction } from '../../../utils/validator';
```

## Common Patterns

### Discriminated Unions

```typescript
type Action = ClickAction | InputAction | ScrollAction;

function handleAction(action: Action) {
  switch (action.type) {
    case 'click':
      // TypeScript knows this is ClickAction
      return action.coordinates;
    case 'input':
      // TypeScript knows this is InputAction
      return action.value;
    case 'scroll':
      // TypeScript knows this is ScrollAction
      return action.scrollPosition;
  }
}
```

### Optional Chaining & Nullish Coalescing

```typescript
// Optional chaining
const tabId = sender.tab?.id;

// Nullish coalescing
const name = testName ?? 'Untitled Test';

// Combined
const url = sender.tab?.url ?? 'about:blank';
```

## Type Safety Checklist

✅ All public functions have explicit return types
✅ No `any` types (use `unknown` if necessary)
✅ Discriminated unions for action types
✅ Type guards for runtime checks
✅ Proper error types
✅ Use strict TypeScript settings
✅ Import types from centralized locations
