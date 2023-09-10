const form = $("form");
const table = $("#todoPage > table > tbody");
animate($("body"), "load");
const anchorTutorial = $("a[href='/tutorial']>button");

anchorTutorial.addEventListener("click", function (e) {
  e.preventDefault();
  animate($("body"), "", "/tutorial");
});

/**
 * Returns the data from a table row
 * @param {object} trTag - The table row tag
 */
function getDataHTML(trTag) {
  const id = trTag.children[0].innerHTML.trim();
  const title = trTag.children[1].innerHTML.trim();
  const status = trTag.children[2].innerHTML.trim();
  return { id, title, status };
}
/**
 * Renders the tasks in the table
 * @param {array} tasks - The tasks to render
 */
function render(tasks) {
  const row = tasks?.map((task) => {
    task = JSON.parse(task);
    const row = document.createElement("tr");
    row.className = "item_bodylist__6MbvD";
    const tdDelete = document.createElement("td");
    tdDelete.className = "item_idStyle__SDQ70 delete";
    tdDelete.innerHTML = task.id;
    handleDelete(tdDelete);
    const tdUpdate = document.createElement("td");
    tdUpdate.className = "item_titleStyle__oOQNm update";
    tdUpdate.innerHTML = task.title;
    handleUpdate(tdUpdate);
    const tdStatus = document.createElement("td");
    tdStatus.className = "item_completeStyle__pwFtv status";
    tdStatus.innerHTML = task.status;
    handleStatus(tdStatus);
    row.append(tdDelete, tdUpdate, tdStatus);
    return row;
  });
  table.innerHTML = "";
  if (row) {
    table.append(...row);
  }
}
/**
 * Handle delete the tag
 * @param {HTMLCollection} tag - The tag to handle the delete
 */
function handleDelete(tag) {
  tag.addEventListener("dblclick", async (e) => {
    const data = getDataHTML(e.target.parentNode);
    await deleteData(data);
    await getData().then((tasks) => render(tasks));
  });
}
/**
 * Handle update the title
 * @param {HTMLCollection} tag - The tag to handle the title
 */
function handleUpdate(tag) {
  tag.addEventListener("click", async () => {
    tag.contentEditable = "true";
  });
  tag.addEventListener("blur", async (e) => {
    const data = getDataHTML(e.target.parentNode);
    await updateData(data);
    await getData().then((tasks) => render(tasks));
  });
}
/**
 * Handle update the status
 * @param {HTMLCollection} tag - The tag to handle the update
 */
function handleStatus(tag) {
  tag.addEventListener("click", async () => {
    tag.innerText = tag.innerText === "true" ? "false" : "true";
    const data = getDataHTML(tag.parentNode);
    await updateData(data);
    await getData().then((tasks) => render(tasks));
  });
}
/**
 * Adds a task to the list
 * @param {object} data - The data of the task to add
 */
async function postData(data) {
  const task = data ? data : JSON.parse(localStorage.task);
  const res = await fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((res) => res.json())
    .then((data) => {
      localStorage.task = data;
      return data;
    });
  return res;
}

/**
 * Fetches the list of tasks
 * @returns {array} The list of tasks
 */
async function getData() {
  const res = await fetch("/todo");
  const { task } = await res.json();
  if (task?.length) {
    localStorage.setItem("task", JSON.stringify(task));
  } else {
    localStorage.removeItem("task");
  }
  return task;
}
/**
 * Deletes a task from the list
 * @param {object} task - The data of the task to delete
 */
async function deleteData(task) {
  await fetch(`/todo`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}
/**
 * Updates a task in the list
 * @param {object} task - The data of the task to update
 */
async function updateData(task) {
  await fetch(`/todo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

/**
 * Handles the submit event of the form
 * @param {Event} e - The event object
 */
async function handleSubmit(e) {
  e.preventDefault();
  const input = $("input").value;
  const data = {
    id: Math.floor(Math.random() * 100000).toString(),
    title: input,
    status: false,
  };
  $("input").value = "Adding task...";
  $("input").disabled = true;
  await postData(data);
  const tasks = await getData();
  render(tasks);
  setTimeout(() => {
    $("input").value = "";
    $("input").disabled = false;
    $("input").focus();
  }, 350);
}

form.addEventListener?.("submit", handleSubmit);

await getData().then((tasks) => render(tasks));
