
/**
 * 存储localStorage
 */
export const setStore = (name: string, content: string) => {
  if (!name)
    return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window
    .localStorage
    .setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = (name: string) => {
  if (!name)
    return;
  return window
    .localStorage
    .getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = (name: string) => {
  if (!name)
    return;
  window
    .localStorage
    .removeItem(name);
}

