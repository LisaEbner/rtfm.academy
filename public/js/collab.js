$(document).ready(function () {
  // Getting references to the name input and collab container, as well as the table body
  var nameInput = $("#collab-name");
  var collabList = $("tbody");
  var collabContainer = $(".collab-container");
  // Adding event listeners to the form to create a new object, and the button to delete
  // an collab
  $(document).on("submit", "#collab-form", handleCollabFormSubmit);
  $(document).on("click", ".delete-collab", handleDeleteButtonPress);

  // Getting the initial list of collabs
  getCollabs();

  // A function to handle what happens when the form is submitted to create a new Collab
  function handleCollabFormSubmit(event) {
    event.preventDefault();
    // Don't do anything if the name fields hasn't been filled out
    if (!nameInput.val().trim().trim()) {
      return;
    }
    // Calling the upsertCollab function and passing in the value of the name input
    upsertCollab({
      name: nameInput
        .val()
        .trim()
    });
  }

  // A function for creating an Collab. Calls getCollabs upon completion
  function upsertCollab(collabData) {
    $.post("/api/collabs", collabData)
      .then(getCollabs);
  }

  // Function for creating a new list row for Collabs
  function createCollabRow(collabData) {
    var newTr = $("<tr>");
    newTr.data("collab", collabData);
    newTr.append("<td>" + collabData.name + "</td>");
    if (collabData.Posts) {
      newTr.append("<td> " + collabData.Posts.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/blog?collab_id=" + collabData.id + "'>Go to Posts</a></td>");
    newTr.append("<td><a href='/cms?collab_id=" + collabData.id + "'>Create a Post</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-collab'>Delete Collab</a></td>");
    return newTr;
  }

  // Function for retrieving Collabs and getting them ready to be rendered to the page
  function getCollabs() {
    $.get("/api/collabs", function (data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createCollabRow(data[i]));
      }
      renderCollabList(rowsToAdd);
      nameInput.val("");
    });
  }

  // A function for rendering the list of Collabs to the page
  function renderCollabList(rows) {
    collabList.children().not(":last").remove();
    collabContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      collabList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no collabs
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create a Collab before you can create a Post.");
    collabContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("collab");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/collabs/" + id
    })
      .then(getCollabs);
  }
});
