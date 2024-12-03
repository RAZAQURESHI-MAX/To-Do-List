var data = [];

    window.onload = function() {
      var savedData = localStorage.getItem('users');
      if (savedData) {
        data = JSON.parse(savedData);
        dataRender();
      }
    };

    var boxDiv = document.getElementsByClassName("box")[0];

    function submitInput(e) {
      e.preventDefault();

      var inp = document.getElementById("input-text");
      var newData = { text: inp.value };

      data.push(newData);

      boxDiv.innerHTML = "";
      dataRender();

      localStorage.setItem('users', JSON.stringify(data));

      inp.value = "";
    }

    function dataRender() {

      for (let i = 0; i < data.length; i++) {
        boxDiv.innerHTML += `<div class='list-item'>
          <p id="text-${i}">${data[i].text}</p>
          <input type="text" id="edit-${i}" value="${data[i].text}" style="display: none;" />
          <button onClick="editItem(${i})">edit</button>
          <button onClick="deleteItem(${i})">delete</button>
        </div>`;
      }
    }

    function deleteItem(index) {
      data.splice(index, 1);

      boxDiv.innerHTML = "";
      dataRender();

      localStorage.setItem('users', JSON.stringify(data));
    }

    function editItem(index) {
      var textElement = document.getElementById(`text-${index}`);
      var inputElement = document.getElementById(`edit-${index}`);
      var editButton = inputElement.nextElementSibling;

      if (editButton.innerText === "edit") {

        textElement.style.display = "none";
        inputElement.style.display = "inline-block";
        editButton.innerText = "save";
      } else if (editButton.innerText === "save") {

        var updatedValue = inputElement.value;
        data[index].text = updatedValue;


        inputElement.style.display = "none";
        textElement.style.display = "block";
        textElement.innerText = updatedValue;

        editButton.innerText = "edit";


        localStorage.setItem('users', JSON.stringify(data));
      }
    }