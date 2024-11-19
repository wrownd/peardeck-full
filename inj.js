var url_regex = /https:\/\/assessment\.peardeck\.com\/student\/assessment\/([a-f0-9]+)\/class\/([a-f0-9]+)\/uta\/([a-f0-9]+)\/itemId\/([a-f0-9]+)/;

var original_addEventListener = Element.prototype.addEventListener;

Element.prototype.addEventListener = function(type, listener, options) {
  var blocked_events = ["focus", "focusin", "focusout", "blur", "visibilitychange"];
  var fullscreen_events = ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"];

  // Block focus-related and visibilitychange events
  if (blocked_events.includes(type)) {
    console.log("Blocked event: " + type);
  } 
  // Intercept fullscreen change events
  else if (fullscreen_events.includes(type)) {
    var callback = function(event) {
      if (document.fullscreenElement == null && url_regex.test(window.location)) {
        console.log("Blocked fullscreen exit event");
      } else {
        listener(event); // Call the original listener
      }
    };
    original_addEventListener.call(this, type, callback, options);
  } 
  // For other events, just call the original addEventListener
  else {
    original_addEventListener.call(this, type, listener, options);
  }
};

function payload() {
  console.log("addEventListener overridden");

  // Change the page title briefly to show that the script has executed
  document.title = "injected";
  setTimeout(() => document.title = "Peardeck", 5000);
}

window.onload = payload;
