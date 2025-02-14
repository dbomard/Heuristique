/**
 * Mise à jour de la formule pour le calcul de l'indice de performance
 */
function updateformula() {
  const columnN0 = document.querySelector("#columnN0");
  const columnN1 = document.querySelector("#columnN1");
  const lastLoan = document.querySelector("#lastLoan");
  const totalLoan = document.querySelector("#totalLoan");
  const recordYear = document.querySelector("#recordYear");
  const nextYear = parseInt(new Date().getFullYear()) + 1;
  const defaultPublishYear = document.querySelector("#yearMissing").value;

  const formula = document.querySelector("#formula");
  formula.children[0].innerText = `SI(${columnN0.value}2="";0;${columnN0.value}2)*1`;
  formula.children[1].innerText = `SI(${columnN1.value}2="";0;${columnN1.value}2)*0,5`;
  formula.children[2].innerText = `(50/(${nextYear}-SI(${recordYear.value}2="";${defaultPublishYear};ANNEE(${recordYear.value}2))))`;
  formula.children[3].innerText = `(20/(${nextYear}-SI(${lastLoan.value}2="";2000;${lastLoan.value}2)))`;
  formula.children[4].innerText = `(${totalLoan.value}2/(${nextYear}-SI(${recordYear.value}2="";${defaultPublishYear};ANNEE(${recordYear.value}2))))`;
}

/**
 * Copie la formule de l'indice de performance dans le presse-papier
 */
function copyToClipboard() {
  console.log("Fonction de copie");
  const formula = document.querySelector("#formula").innerText;

  navigator.clipboard.writeText(formula).then(
    function () {
      alert("La formule a été copiée");
    },
    function () {
      alert("La formule n'a pas été copiée");
    }
  );
}

/**
 * Mise à jour des labels pour les années N et N-1
 */
function updateDates() {
  let currentYear = document.querySelector("#current-year").value;
  document.querySelector(
    "#columnN0Label"
  ).innerText = `Colonne nombre de prêts de l'année ${currentYear} :`;
  document.querySelector(
    "#columnN1Label"
  ).innerText = `Colonne nombre de prêts de l'année ${currentYear - 1} :`;
  // TODO : ajouter une message pour rappeler de changer également la lettre de la colonne.
}

/**
 * Initialistation lorsque le DOM est chargé
 */
document.addEventListener("DOMContentLoaded", () => {
  const currentYearInput = document.querySelector("#current-year");
  currentYearInput.value = new Date().getFullYear();
  currentYearInput.max = new Date().getFullYear();
  currentYearInput.min = new Date().getFullYear() - 2;
  updateDates();
  // Gestionnaire de changement de la dernière année de prêt
  currentYearInput.addEventListener("change", (e) => {
    let currentYear = e.target.value;
    let maxYear = new Date().getFullYear();
    let currentYearInput = document.querySelector("#current-year");

    if (currentYear > maxYear) {
      currentYearInput.value = maxYear;
    } else if (currentYear < maxYear - 2) {
      currentYearInput.value = maxYear - 2;
    }
    updateDates();
  });

  const yearMissing = document.querySelector("#yearMissing");
  yearMissing.max = new Date().getFullYear();
  // gestionnaire de choix de la date de publication/acquisition par défaut si non renseignée
  yearMissing.addEventListener("change", (e) => {
    let yearMax = new Date().getFullYear();
    let yearElement = e.target;
    if (yearElement.value < 1800) {
      yearElement.value = 1800;
    } else if (yearElement.value > yearMax) {
      yearElement.value = yearMax;
    }
  });

  const yearOptionToggler = document.querySelector("#showYearOptions");
  // Masque/Affiche menu options type de date
  yearOptionToggler.addEventListener("click", (e) => {
    let toggler = e.currentTarget;
    let target = document.querySelector(`#${toggler.dataset.target}`);
    if (toggler.classList.contains("arrow-down")) {
      toggler.classList.remove("arrow-down");
      toggler.classList.add("arrow-up");
      target.classList.remove("cadre-folded");
    } else {
      toggler.classList.remove("arrow-up");
      toggler.classList.add("arrow-down");
      target.classList.add("cadre-folded");
    }
  });

  const columns = document.querySelectorAll(".entry");
  columns.forEach((element) =>
    element.addEventListener("change", updateformula)
  );
  updateformula();
  const copyBtn = document.querySelector("#copy");
  copyBtn.addEventListener("click", copyToClipboard);
  const formulaCells = document.querySelectorAll(".formula-cell");
  const columnsCells = document.querySelectorAll('input[type="text"].entry');
  // Gestionnaires pour les changements visuels lors du survol des zones de formule et des entrées de colonnes
  for (let i = 0; i < 5; i++) {
    formulaCells[i].addEventListener("mouseover", (e) => {
      let indice = e.currentTarget.dataset.index;
      e.currentTarget.classList.add(`hover-formula-style${indice}`);
      let element = document.querySelector(`.entry[data-index="${indice}"]`);
      element.classList.add(`selected-column-style${indice}`);
    });
    formulaCells[i].addEventListener("mouseout", (e) => {
      let indice = e.currentTarget.dataset.index;
      e.currentTarget.classList.remove(`hover-formula-style${indice}`);
      let element = document.querySelector(`.entry[data-index="${indice}"]`);
      element.classList.remove(`selected-column-style${indice}`);
    });
    columnsCells[i].addEventListener("mouseover", (e) => {
      let indice = e.currentTarget.dataset.index;
      e.currentTarget.classList.add(`selected-column-style${indice}`);
      let element = document.querySelector(
        `.formula-cell[data-index="${indice}"]`
      );
      element.classList.add(`hover-formula-style${indice}`);
    });
    columnsCells[i].addEventListener("mouseout", (e) => {
      let indice = e.currentTarget.dataset.index;
      e.currentTarget.classList.remove(`selected-column-style${indice}`);
      let element = document.querySelector(
        `.formula-cell[data-index="${indice}"]`
      );
      element.classList.remove(`hover-formula-style${indice}`);
    });
  }
});
