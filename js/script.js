// V2
class Parameter {
  static index = 0;

  constructor(title, column = "A", weight = 5, active = true, formulaElt) {
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
    this.formulaElt = formulaElt;
    this.id = Parameter.index;
    Parameter.index++;
    this.addElementToDOM();
    if (!active) {
      let e = new Event("change");
      // e.target = this.activeElt;
      this.activeElt.checked = false;
      this.activeElt.dispatchEvent(e);
    }
  }

  addElementToDOM() {
    console.log("Add element to DOM");
    let template = document.querySelector("#parameter");
    let clone = document.importNode(template.content, true);

    this.activeElt = clone.querySelector("#active");
    this.activeElt.id = `active${this.id}`;
    this.activeElt.checked = true;
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
      this.updateFormula();
      this.formulaElt.updateDOM();
    });
    let paramatersSection = document.querySelector("#parameters");
    paramatersSection.appendChild(clone);
  }
}

class Coefficient extends Parameter {
  constructor(title, column = "A", weight = 5, active = true, formulaElt) {
    super(title, column, weight, active, formulaElt);
    console.log("New Coefficient object");
    this.formula = `SI(${this.column}2="";0;${this.column}2)*${
      this.weight / 10
    }`;
  }

  toString() {
    return this.formula;
  }

  addElementToDOM() {
    super.addElementToDOM();
    this.rangeElt.max = 1;
    this.rangeElt.step = 0.1;
    this.rangeElt.value = this.weight / 10;
  }
}

class Ponderation extends Parameter {
  constructor(
    title,
    column = "A",
    weight = 5,
    active = true,
    formulaElt,
    nextYear = "2025"
  ) {
    super(title, column, weight, active, formulaElt);
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
    let formulaText = "";
    let elt = document.querySelector("#formula");
    this.parametersList.forEach((element) => {
      formulaText += element.toString() + " + ";
    });
    elt.innerText = formulaText;
    console.log(formulaText);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formula = new Formula();
  const loanN = new Coefficient(
    "Nombre de prêts dans l'année N",
    "H",
    10,
    true,
    formula
  );
  const loanN1 = new Coefficient(
    "Nombre de prêts dans l'année N-1",
    "I",
    5,
    true,
    formula
  );
  const loanN2 = new Coefficient(
    "Nombre de prêts dans l'année N-2",
    "J",
    0,
    false,
    formula
  );
  const loanN3 = new Coefficient(
    "Nombre de prêts dans l'année N-3",
    "K",
    0,
    false,
    formula
  );
  const last = new Ponderation(
    "Dernière année de prêt",
    "G",
    5,
    true,
    formula,
    "2025"
  );
  const total = new Ponderation(
    "Nombre de prêts cumulés",
    "L",
    2,
    true,
    formula,
    "2025"
  );
  const added = new Parameter("Date de saisie", "F");
  const published = new Parameter("Publié le", "E");
  const paramaterList = new Array();
  paramaterList.push(loanN);
  paramaterList.push(loanN1);
  paramaterList.push(loanN2);
  paramaterList.push(loanN3);
  paramaterList.push(last);
  paramaterList.push(total);
  paramaterList.push(added);
  paramaterList.push(published);

  paramaterList.forEach((parameter) => {
    formula.addParameter(parameter);
  });
  formula.updateDOM();
});
