console.log('watch Github')
const script = document.createElement('script')
script.innerHTML = `const _historyWrap = function (type) {
  const orig = history[type];
  const e = new Event(type);
  return function () {
    const rv = orig.apply(this, arguments);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _historyWrap("pushState");
history.replaceState = _historyWrap("replaceState");
window.addEventListener("replaceState", function (e) {
  const regex = /^https?:\\/\\/github\\.com\\/.*\\?tab=star/;
  if(regex.test(e.arguments[e.arguments.length - 1])) {
    window.location.reload();
  }
});`
document.head.appendChild(script)
