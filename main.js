var base_url = "https://raw.githubusercontent.com/wrownd/peardeck-full/main";

async function get_hash(str) {
  if (!window.TextEncoder || !crypto.subtle.digest) {
    return "";
  }
  let str_encoded = new TextEncoder().encode(str);
  let hash_buffer = await crypto.subtle.digest("SHA-256", str_encoded);
  let hash_array = Array.from(new Uint8Array(hash_buffer));
  let output = "";
  for (let byte of hash_array) {
    output += byte.toString(16).padStart(2, "0");
  }
  return output
}

async function main() {
  let url_regex = /https:\/\/assessment\.peardeck\.com.+/;
  if (!url_regex.test(window.location)) {
    alert("Error: Invalid URL.\n\nFor reference, the URL should look like this:\nhttps://assessment.peardeck.com/student/assessment/*\nhttps://assessment.peardeck.com/home/assignments");
    return;
  }
  
  let url = base_url+"/inj.js";
  let r2 = await fetch(url);
  let script_text = await r2.text();
  let w = window.open(window.location.href);
  let script = w.document.createElement("script");
  script.innerHTML = script_text;
  w.document.body.appendChild(script);
}

main();
