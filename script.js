const buttons = {
  timestamp: document.getElementById('timestamp'),
  incrementsuffix: document.getElementById('incrementsuffix'),
}

const inputs = {
  incrementtext: document.getElementById('incrementtext'),
}
inputs.incrementtext.addEventListener('input', function(e) {
  setChromeStorage('incrementtext', e.target.value);
})
buttons.incrementsuffix.addEventListener('click', incrementSuffix);
buttons.timestamp.addEventListener('click', generateTimestamp);

function generateTimestamp() {
  const date = new Date();
  const timestamp = date.getTime();
  writeToClipboard(timestamp.toString())
}

function incrementSuffix() {
  chrome.storage.sync.get('incrementtext', function({ incrementtext: text }) {
    const prefix = text.replace(/[0-9]/g, '');
    const suffix = +(text.replace(/\D/g,'')) + 1;
    const new_text = `${prefix}${suffix}`
    inputs.incrementtext.value = new_text;
    writeToClipboard(new_text);
    setChromeStorage('incrementtext', new_text);
  });
}

function writeToClipboard(value) {
  navigator.clipboard.writeText(value);
}

function setChromeStorage(key, value) {
  chrome.storage.sync.set({ [key]: value }, function() {
    console.log(`Set ${key} to ${value}`);
  });
}

function init() {
  chrome.storage.sync.get('incrementtext', function({ incrementtext: text }) {
    inputs.incrementtext.value = text;
  });
}

init();