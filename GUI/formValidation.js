/** Checks validity of info submitted with form */

class FormValidation {
  nameError() {
    let valid = true;
    const name = document.getElementById("name");
    let nameErrorMessage = document.querySelector("#nameError");

    if (!name.checkValidity()) {
      this.displayNameError(name, nameErrorMessage);
      valid = false;
      nameErrorMessage.className = "error";
    } else {
      nameErrorMessage.textContent = "";
      nameErrorMessage.classList.remove("error");
      valid = true;
    }
    return valid;
  }

  displayNameError(nameInput, nameError) {
    if (nameInput.validity.valueMissing) {
      nameError.textContent = "Enter your name.";
    } else if (nameInput.validity.patternMismatch) {
      nameError.textContext = "Only enter alphabetic letters.";
    }
  }

  rowError() {
    let valid = true;
    const row = document.getElementById("row");
    const rowErrorMessage = document.querySelector("#rowError");

    if (!row.checkValidity()) {
      this.displayNumError(row, rowErrorMessage);
      valid = false;
      rowErrorMessage.className = "error";
    } else {
      rowErrorMessage.textContent = "";
      rowErrorMessage.classList.remove("error");
      valid = true;
    }
    return valid;
  }

  colError() {
    let valid = true;
    const col = document.getElementById("col");
    const colErrorMessage = document.querySelector("#colError");

    if (!col.checkValidity()) {
      this.displayNumError(col, colErrorMessage);
      valid = false;
      colErrorMessage.className = "error";
    } else {
      colErrorMessage.textContent = "";
      colErrorMessage.classList.remove("error");
      valid = true;
    }
    return valid;
  }

  displayNumError(input, error) {
    if (input.validity.valueMissing) {
      error.textContent = "Enter positive number.";
    } else {
      error.textContent = "Enter a positive number greater than 2.";
    }
  }

  levelError() {
    let valid = true;
    const level = document.getElementById("level");
    const levelErrorMessage = document.querySelector("#levelError");

    if (!level.checkValidity()) {
      levelErrorMessage.textContent = "";
      levelErrorMessage.textContent = "Enter a positive number.";
      valid = false;
      levelErrorMessage.className = "error";
    } else {
      levelErrorMessage.textContent = "";
      valid = true;
    }
  }

  loadGameError() {
    const loadGameName = document.getElementById("loadMaze");
    const loadGameErrorMessage = document.getElementById("loadError");

    if (!loadGameName.checkValidity()) {
      if (loadGameName.validity.valueMissing) {
        this.displayNameError(loadGameName, loadGameErrorMessage);
        loadGameErrorMessage.className = "error";
      }
    }

    // if game not found...
    loadGameErrorMessage.textContent = "No game matching this name.";
    loadGameErrorMessage.className = "error";
  }
}

export default FormValidation;
