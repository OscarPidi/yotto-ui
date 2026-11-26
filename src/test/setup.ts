import '@testing-library/jest-dom/vitest'

// jsdom has no ResizeObserver; Radix primitives (RadioGroup, Slider…) need one.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
