/** Checks validity of info submitted with form */

class FormValidation {
  /** Validate name input */
  nameError() {
    const name = document.getElementById("name");
    const nameErrorMessage = document.querySelector("#name + p.error");

    if (name.checkValidity()) {
      nameErrorMessage.textContent = "";
      nameErrorMessage.className = "error";
      return true;
    }

    if (name.validity.valueMissing) {
      nameErrorMessage.textContent = "Enter username";
    } else if (name.validity.patternMismatch) {
      nameErrorMessage.textContent = "Only enter alphabetic letters";
    }
    nameErrorMessage.className = "error active";
    return false;
  }

  /** Validate row/col input */
  rowError() {
    const rows = document.getElementById("row");
    const rowErrorMessage = document.querySelector("#rows + p.error");

    if (rows.checkValidity()) {
      rowErrorMessage.textContent = "";
      rowErrorMessage.className = "error";
      return true;
    }

    if (rows.validity.valueMissing) {
      rowErrorMessage.textContent = "Enter a positive number greater than 2.";
    } else {
      rowErrorMessage.textContent = "Enter a positive number greater than 2.";
    }
    rowErrorMessage.className = "error active";
    return false;
  }

  colError() {
    const cols = document.getElementById("cols");
    const colErrorMessage = document.querySelector("#rows + p.error");

    if (cols.checkValidity()) {
      colErrorMessage.textContent = "";
      colErrorMessage.className = "error";
      return true;
    }

    if (cols.validity.valueMissing) {
      colErrorMessage.textContent = "Enter a positive number greater than 2.";
    } else {
      colErrorMessage.textContent = "Enter a positive number greater than 2.";
    }
    colErrorMessage.className = "error active";
    return false;
  }

  levelError() {
    const levels = document.getElementById("levels")
    const levelErrorMessage = document.querySelector("#levels + span.error");

    if (levels.checkValidity()) {
      levelErrorMessage.textContent = "";
      levelErrorMessage.className = "error";
      return true;
    } 
    
    if (levels.validity.valueMissing) {
      errorMessage.textContent = "Enter a positive number.";
    } else {
      errorMessage.textContent = "Enter a positive number.";
    }
    levelErrorMessage.className = "error active";
    return false;
    }
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
