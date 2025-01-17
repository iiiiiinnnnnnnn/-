(function(d, j, s) {
  try {
    s = d.createElement("script");
    s.setAttribute("charset", "utf-8");
    s.src = "https://www.nicozon.net/js/bookmarklet.js";
    d.body.appendChild(s);
    console.log("Bookmarklet script executed.");
  } catch (error) {
    console.error("Error executing the bookmarklet script:", error);
  }
})(document);
