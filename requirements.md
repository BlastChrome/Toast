## Toast Messaging Weekend Project

Goal: build a polished toast/notification system that demonstrates clean pub/sub architecture, solid UI polish, and good developer ergonomics.

### Core Toast Features

- Multiple toast types with distinct styling (success, error, info, warning). Support optional icon/emoji per type.
- Configurable duration per toast; `0` should keep the toast visible until manually dismissed.
- Queue management: if a toast is visible, subsequent requests enqueue and display sequentially (FIFO).
- Optional dismiss button and auto-dismiss progress bar so users see remaining time.
- Support stacking (configurable `maxVisible`) for rapid-fire messages.

### Pub/Sub Contracts

- Expose a `toast:request` event whose payload includes `{ message, type, duration, actions? }`.
- Publish lifecycle events `toast:shown` and `toast:hidden` with metadata (timestamp, duration, type) for analytics or debugging modules.
- `subscribe` should return an unsubscribe handle; publishing should isolate errors (one bad listener cannot break others).
- Provide a way for modules to inject their own PubSub bus or use a shared singleton exported by the project.

### Accessibility & UX

- Toast container uses `role="status"` or `role="alert"` and `aria-live="polite"` to announce updates.
- Respect `prefers-reduced-motion` and avoid aggressive animation if set.
- All interactive elements (dismiss buttons, action links) are keyboard accessible and have visible focus states.
- Ensure content truncation/overflow handling for long messages.

### Configuration & Extensibility

- `new ToastManager(pubSub, options)` where `options` can set defaults (duration, maxVisible, animation timings).
- Allow custom render hooks/templates so developers can override markup without editing the core class.
- Provide `destroy()` to remove DOM nodes and unsubscribe from events.
- Optional theming via CSS variables or a lightweight configuration API.

### Sample Integrations

- Button that publishes different toast types to demonstrate the API.
- Module (e.g., ColorHistory) that publishes `toast:request` when history updates to show cross-module messaging.
- Simulated async error handler that publishes error toasts after a delay.

### Documentation & Testing

- README section explaining the event API, payload shapes, and configuration options.
- Animated GIF or screenshot showing the toast system in action.
- Basic unit tests (if feasible) covering queue logic, duration handling, and unsubscribe behavior.
- Manual test checklist (browser support, keyboard navigation, repeated rapid publishes, etc.).

Completing these requirements should result in a reusable toast system that highlights event-driven design, accessibility, and front-end polish—perfect for a weekend learning project.
