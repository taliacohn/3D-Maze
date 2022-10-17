/** Checks validity of info submitted with form */

class FormValidation {
  nameError() {
    let valid = true;

    const name = document.getElementById("name");
    let nameErrorMessage = document.querySelector("#name + span.error");

    if (!name.checkValidity()) {
      if (name.validity.valueMissing) {
        nameErrorMessage.textContent = "Enter your name.";
      } else if (name.validity.patternMismatch) {
        nameErrorMessage.textContext = "Only enter alphabetic letters.";
      }
      valid = false;
      nameErrorMessage.className = "error active";
    } else {
      nameErrorMessage.textContent = "";
      nameErrorMessage.className = "error";
      valid = true;
    }
    return valid;
  }

  rowError() {
    let valid = true;
    const row = document.getElementById("row");
    const rowErrorMessage = document.querySelector("#rows + span.error");

    if (!row.checkValidity()) {
      if (row.validity.valueMissing) {
        rowErrorMessage.textContent = "Enter positive number.";
      } else {
        rowErrorMessage.textContent = "Enter a positive number greater than 2.";
      }
      valid = false;
      rowErrorMessage.className = "error active";
    } else {
      rowErrorMessage.textContent = "";
      rowErrorMessage.className = "error";
      valid = true;
    }
    return valid;
  }

  colError() {
    let valid = true;
    const col = document.getElementById("cols");
    const colErrorMessage = document.querySelector("#rows + span.error");

    if (!col.checkValidity()) {
      if (row.validity.valueMissing) {
        colErrorMessage.textContent = "Enter positive number.";
      } else {
        colErrorMessage.textContent = "Enter a positive number greater than 2.";
      }
      valid = false;
      colErrorMessage.className = "error active";
    } else {
      colErrorMessage.textContent = "";
      colErrorMessage.className = "error";
      valid = true;
    }
    return valid;
  }

  levelError() {
    let valid = true;
    const level = document.getElementById("level");
    const levelErrorMessage = document.querySelector("#levels + span.error");

    if (!level.checkValidity()) {
      levelErrorMessage.textContent = "Enter a positive number.";
      levelErrorMessage.className = "error active";
      valid = false;
    } else {
      levelErrorMessage.textContent = "";
      levelErrorMessage.className = "error";
      valid = true;
    }
    return valid;
  }

  // loadGameError() {
  //   const loadGameName = document.getElementById("loadMaze");
  //   const loadGameErrorMessage = document.getElementById("loadError");

  //   if (!loadGameName.checkValidity()) {
  //     if (loadGameName.validity.valueMissing) {
  //       this.displayNameError(loadGameName, loadGameErrorMessage);
  //       loadGameErrorMessage.className = "error";
  //     }
  //   }

  //   // if game not found...
  //   loadGameErrorMessage.textContent = "No game matching this name.";
  //   loadGameErrorMessage.className = "error";
  // }
}

export default FormValidation;
