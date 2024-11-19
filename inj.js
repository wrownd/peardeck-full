var url_regex = /https:\/\/assessment\.peardeck\.com\/student\/assessment\/([a-f0-9]+)\/class\/([a-f0-9]+)\/uta\/([a-f0-9]+)\/itemId\/([a-f0-9]+)/;

Element.prototype._addEventListener = Element.prototype.addEventListener;
Element.prototype.addEventListener = function(type, listener, options) {
  var blocked_events = ["focus", "focusin", "focusout", "blur", "visibilitychange"];
  var fullscreen_events = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"];
  
  if (blocked_events.includes(type)) {
    console.log("Blocked event: " + type);
  } 
  else if (fullscreen_events.includes(type)) {
    var callback = function(event) {
      if (document.fullscreenElement == null && url_regex.test(window.location)) {
        console.log("Blocked fullscreen exit event");
      } else {
        listener(event);
      }
    };
    this._addEventListener(type, callback, options);
  } 
  else {
    this._addEventListener(type, listener, options);
  }
};

function payload() {
  window.addEventListener = Element.prototype.addEventListener;
  document.addEventListener = Element.prototype.addEventListener;
  console.log("addEventListener overridden");

  document.title = "injected";
  setTimeout(() => document.title = "Peardeck", 5000);
}

window.onload = payload;
