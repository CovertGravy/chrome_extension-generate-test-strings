const values = {
  incrementtext: "test0"
}
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set(values);
});