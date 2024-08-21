window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("tr.scouts").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      changeView(toggle.children[0].textContent);
    });
  });
});

async function changeView(id) {
  try {
    const response = await fetch(`/scouts/${id}`, {
      method: "get",
    });
    const data = await response.text();
    document.querySelector("#detailScout").innerHTML = data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function sendView(id) {
  let selected = [];
  const selectorBelong = document.getElementById("belongForm");
  document.querySelectorAll("#wasList input").forEach((node) => {
    if (node.checked) {
      selected.push(true);
      console.log("Selected");
    } else {
      selected.push(false);
      console.log("Fatal");
    }
  });

  const body = {
    id: id,
    middle: document.getElementById("inlineFormInputMiddle").value,
    name: document.getElementById("inlineFormInputName").value,
    belong: selectorBelong.options[selectorBelong.selectedIndex].value,
    wasbvs: selected[0],
    wascs: selected[1],
    wasbs: selected[2],
    wasvs: selected[3],
    wasrs: selected[4],
  };
  try {
    const response = await fetch(`/scouts`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.text();
    document.querySelector("#detailScout").innerHTML = data;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function editView(id) {
  try {
    const response = await fetch(`/scouts/create/${id}`, {
      method: "get",
    });
    const data = await response.text();
    document.querySelector("#editModalContent").innerHTML = data;
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
  document.getElementById("sendForm").addEventListener("click", () => {
    sendView(document.getElementById("idscout").content);
  });
});

window.onresize = resizeTable;
