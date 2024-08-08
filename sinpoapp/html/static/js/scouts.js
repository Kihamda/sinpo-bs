window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("tr.scouts").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      console.log("clicked " + toggle.children[0].textContent);
    });
  });
});

async function changeView(id) {
  try {
    const response = await fetch(`/scouts/${id}`, {
      method: "POST",
      body: JSON.stringify(),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

function resizeTable() {
  let otherheight = 0;
  const bottom = document.querySelectorAll("body > nav , body > h1");
  for (let i = 0; i < bottom.length; i++) {
    otherheight = otherheight + bottom[i].offsetHeight;
  }

  otherheight = otherheight + document.querySelector("#selecter").offsetHeight;
  const item = document.querySelector("#table");
  let lsheight = document.querySelector("body").offsetHeight - otherheight - 80;
  if (lsheight < 500) lsheight = 500;
  item.style.height = lsheight + "px";
}

window.addEventListener("DOMContentLoaded", () => {
  resizeTable();
});

window.onresize = resizeTable;
