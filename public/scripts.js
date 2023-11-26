const createList = (result) => {
  let template = "";

  result.forEach((datum, i) => {
    console.log("hello", datum);
    template += `
          <tr class="tabler">
            <td>${datum.type}</td>
            <td>${datum.sauce}</td>
            <td>${datum.count}</td>
            <td id="tag-${i}-deleteorder"><img class="imaage" src="https://www.svgrepo.com/download/21045/delete-button.svg"/></td>
          </tr>
        `;
  });

  document.querySelector("#container").innerHTML = template;

  for (let i = 0; i < result.length; i++) {
    console.log(result, i);
    document
      .querySelector(`#tag-${i}-deleteorder`)
      .addEventListener("click", async () => {
        const response = await fetch(`tacoshop/${i}`, { method: "DELETE" });
        const data = await response.json();

        createList(data);
      });
  }
};

const getListData = async () => {
  const response = await fetch("/tacoshop");
  const data = await response.json();

  createList(data);
};

getListData();

document.querySelector("#guess").addEventListener("click", async function () {
  const type = document.querySelector("#type").value.trim();
  const sauce = document.querySelector("#sauce").value.trim();
  const count = document.querySelector("#count").value.trim();

  if (type === "" || sauce === "" || count === "") {
    console.log("condition met");
    return;
  }
  console.log("not met");

  const obj = {
    type: type,
    sauce: sauce,
    count: count,
  };

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const res = await fetch("/tacoshop", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(obj),
  });

  const data = await res.json();

  console.log(data);

  createList(data);
});
