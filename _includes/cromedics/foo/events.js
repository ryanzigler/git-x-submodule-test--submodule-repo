/**
 * Send a custom event to Foo
 */
export const sendEvent = (eventName, tags = {}) => {
  window.foo.push({
    type: "event",
    eventName,
    tags,
  });
};
