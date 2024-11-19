var base_url = "https://raw.githubusercontent.com/wrownd/peardeck-full/main"

async function main() {
  let url_regex = /https:\/\/assessment\.peardeck\.com.+/;
  if (!url_regex.test(window.location)) {
    alert("Error: Invalid URL.");
    return;
  }

  let url = base_url + "/inj.js";
  let r2 = await fetch(url);
  let script_text = await r2.text();
  let w = window.open(window.location.href);
  let script = w.document.createElement("script");
  script.innerHTML = script_text;
  w.document.body.appendChild(script);
}

main();
