// V2
class Parameter {
  static index = 0;

  constructor(title, column = "A", weight = 5, active = true) {
    console.log("New paramater object");
    this.title = title;
    this.column = column;
    if (weight < 0) {
      weight = 0;
    } else if (weight > 10) {
      weight = 10;
    }
    this.weight = weight;
    this.active = active;
    this.id = Parameter.index;
    Parameter.index++;
    this.addElementToDOM();
  }

  addElementToDOM() {
    console.log("Add element to DOM");
    let template = document.querySelector("#parameter");
    let clone = document.importNode(template.content, true);

    this.activeElt = clone.querySelector("#active");
    this.activeElt.id = `active${this.id}`;
    this.activeElt.checked = this.active;
    this.activeElt.addEventListener("change", () => {
      this.active = this.activeElt.checked;
      this.titleElt.disabled = !this.active;
      this.columnElt.disabled = !this.active;
      this.rangeElt.disabled = !this.active;
    });

    this.titleElt = clone.querySelector("#title");
    this.titleElt.id = `title${this.id}`;
    this.titleElt.innerText = this.title;

    this.columnElt = clone.querySelector("#column");
    this.columnElt.id = `column${this.id}`;
    this.columnElt.value = this.column;

    this.rangeElt = clone.querySelector("#range");
    this.rangeElt.id = `range${this.id}`;
    this.rangeElt.value = this.weight;
    this.rangeElt.addEventListener("input", (e) => {
      this.weight = this.rangeElt.value;
      console.log(`Influence : ${this.weight}`);
      console.log(e.target);
    });

    let paramatersSection = document.querySelector("#parameters");
    paramatersSection.appendChild(clone);
  }
}

class Coefficient extends Parameter {
  constructor(title, column = "A", weight = 5, active = true) {
    super(title, column, weight, active);
    console.log("New Coefficient object");
    this.formula = `SI(${this.column}2="";0;${this.column}2)*1`;
  }

  toString() {
    return this.formula;
  }
}

class Ponderation extends Parameter {
  constructor(
    title,
    column = "A",
    weight = 5,
    active = true,
    nextYear = "2025"
  ) {
    super(title, column, weight, active);
    console.log("New Coefficient object");
    this.nextYear = nextYear;
    this.updateFormula();
  }

  updateFormula() {
    this.formula = `(${this.weight * 10}/(${this.nextYear}-SI(${
      this.column
    }2="";2010;ANNEE(${this.column}2))))`;
  }

  toString() {
    return this.formula;
  }
}

class Formula {
  constructor() {
    console.log("New Formula object");
    this.parametersList = [];
  }

  addParameter(paramater) {
    this.parametersList.push(paramater);
  }

  updateDOM() {
    var elt = document.querySelector("#formula");
    this.parametersList.forEach((element) => {
      console.log(element.toString());
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loanN = new Coefficient("Nombre de prêts dans l'année N", "H");
  const loanN1 = new Coefficient("Nombre de prêts dans l'année N-1", "I");
  const loanN2 = new Coefficient("Nombre de prêts dans l'année N-2", "J");
  const loanN3 = new Coefficient("Nombre de prêts dans l'année N-3", "K");
  const last = new Ponderation("Dernière année de prêt", "G", 5, true, "2025");
  const total = new Ponderation(
    "Nombre de prêts cumulés",
    "L",
    2,
    true,
    "2025"
  );
  const added = new Parameter("Date de saisie", "F");
  const published = new Parameter("Publié le", "E");
  const formula = new Formula();
  formula.addParameter(loanN);
  formula.addParameter(loanN1);
  formula.addParameter(loanN2);
  formula.addParameter(loanN3);
  formula.addParameter(last);
  formula.addParameter(total);
  formula.addParameter(added);
  formula.addParameter(published);
  formula.updateDOM();
});

// V1
// function updateformula() {
//   const columnN0 = document.querySelector("#columnN0");
//   const columnN1 = document.querySelector("#columnN1");
//   const lastLoan = document.querySelector("#lastLoan");
//   const totalLoan = document.querySelector("#totalLoan");
//   const recordYear = document.querySelector("#recordYear");
//   const currentYear = document.querySelector("#current-year").innerText;
//   const nextYear = parseInt(currentYear) + 1;

//   const formula = document.querySelector("#formula");
//   formula.children[0].innerText = `SI(${columnN0.value}2="";0;${columnN0.value})*1`;
//   formula.children[1].innerText = `SI(${columnN1.value}2="";0;${columnN1.value})*0,5`;
//   formula.children[2].innerText = `(50/(${nextYear}-SI(${recordYear.value}2="";2010;ANNEE(${recordYear.value}2))))`;
//   formula.children[3].innerText = `(20/(${nextYear}-SI(${lastLoan.value}2="";2000;${lastLoan.value}2)))`;
//   formula.children[4].innerText = `(${totalLoan.value}2/(${nextYear}-SI(${recordYear.value}2="";2010;ANNEE(${recordYear.value}2))))`;
//   // const text =;
//   // +\
//   // +\
//   // +\
//   // `;
//   // formula.innerText = text;
// }

// function copyToClipboard() {
//   console.log("Fonction de copie");
//   const formula = document.querySelector("#formula").innerText;

//   navigator.clipboard.writeText(formula).then(
//     function () {
//       alert("Le texte a été copié");
//     },
//     function () {
//       alert("Le texte n'a pas été copié");
//     }
//   );
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const currentYearInput = document.querySelector("#current-year");
//   currentYearInput.innerText = new Date().getFullYear();
//   const columns = document.querySelectorAll(".entry");
//   columns.forEach((element) =>
//     element.addEventListener("change", updateformula)
//   );
//   updateformula();
//   const copyBtn = document.querySelector("#copy");
//   copyBtn.addEventListener("click", copyToClipboard);
// });
