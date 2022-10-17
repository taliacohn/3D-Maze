/** Checks validity of info submitted with form */

class FormValidation {
  /** Validate name input */
  nameError() {
    const name = document.getElementById("name");
    const nameErrorMessage = document.querySelector("#name + span.error");

    if (name.checkValidity()) {
      nameErrorMessage.textContent = "";
      nameErrorMessage.className = "error";
      return true;
    } else {
      showNameError(name, nameErrorMessage);
      return false;
    }
  }

  showNameError(name, errorMessage) {
    if (name.validity.valueMissing) {
      errorMessage.textContent = "Enter username";
    } else if (name.validity.patternMismatch) {
      errorMessage.textContent = "Only enter alphabetic letters";
    }
    errorMessage.className = "error active";
  }

  /** Validate row/col input */
  rowError() {
    const rows = document.getElementById("row");
    const rowErrorMessage = document.querySelector("#rows + span.error");

    if (rows.checkValidity()) {
      rowErrorMessage.textContent = "";
      rowErrorMessage.className = "error";
      return true;
    } else {
      showNumError(rows, rowErrorMessage);
      return false;
    }
  }

  colError() {
    const cols = document.getElementById("cols");
    const colErrorMessage = document.querySelector("#rows + span.error");

    if (cols.checkValidity()) {
      colErrorMessage.textContent = "";
      colErrorMessage.className = "error";
      return true;
    } else {
      showNumError(cols, colErrorMessage);
      return false;
    }
  }

  showNumError(input, errorMessage) {
    if (input.validity.valueMissing) {
      errorMessage.textContent = "Enter a positive number greater than 2.";
    } else {
      errorMessage.textContent = "Enter a positive number greater than 2.";
    }
    errorMessage.className = "error active";
  }

  levelError(levels) {
    const levelErrorMessage = document.querySelector("#levels + span.error");

    if (levels.checkValidity()) {
      levelErrorMessage.textContent = "";
      levelErrorMessage.className = "error";
      return true;
    } else {
      showLevelError(levels, levelErrorMessage);
      return false;
    }
  }

  showLevelError(level, errorMessage) {
    if (level.validity.valueMissing) {
      errorMessage.textContent = "Enter a positive number.";
    } else {
      errorMessage.textContent = "Enter a positive number.";
    }
    errorMessage.className = "error active";
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
