import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement scrollTo
Element.prototype.scrollTo = () => {};
