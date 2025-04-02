const globalEvents = new Map();

// 렌더링이 끝나면 전역 이벤트를 등록해줌
export function setupEventListeners(root) {
  for (const eventType of globalEvents.keys()) {
    root.removeEventListener(eventType, handleGlobalEvents);
    root.addEventListener(eventType, handleGlobalEvents);
  }
}

export function handleGlobalEvents(e) {
  if (globalEvents[e.type].has(e.target)) {
    globalEvents[e.type].get(e.target)(e);
  }
}

// 이벤트를 전역 객체에 넣어주는 함수...createElement에서 쓰고 있음
export function addEvent(element, eventType, handler) {
  if (!element || typeof handler !== "function") return;

  globalEvents[eventType] = globalEvents[eventType] || new WeakMap();
  globalEvents[eventType].set(element, handler);
}

export function removeEvent(element, eventType, handler) {
  // 이벤트가 없으면 호출을 막기 위함
  if (
    globalEvents[eventType] &&
    globalEvents[eventType].get(element) === handler
  ) {
    globalEvents[eventType].delete(element);
  } else return;
}
