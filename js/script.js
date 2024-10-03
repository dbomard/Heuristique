function updateformula() {
  const columnN0 = document.querySelector("#columnN0");
  const columnN1 = document.querySelector("#columnN1");
  // const columnN2 = document.querySelector("#columnN2");
  // const columnN3 = document.querySelector("#columnN3");
  // const acq = document.querySelector("#acq");
  const lastLoan = document.querySelector("#lastLoan");
  const totalLoan = document.querySelector("#totalLoan");
  const recordYear = document.querySelector("#recordYear");
  const currentYear = document.querySelector("#current-year").innerText;
  const nextYear = parseInt(currentYear) + 1;

  const formula = document.querySelector("#formula");
  const text = `=${columnN0.value}2*1+\
${columnN1.value}2*0,5+\
(50/(${nextYear}-SI(ANNEE(${recordYear.value}2)="";2010;ANNEE(${recordYear.value}2))))+\
(20/(${nextYear}-SI(ANNEE(${lastLoan.value}2)="";2000;ANNEE(${lastLoan.value}2))))+\
(${totalLoan.value}2/(${nextYear}-SI(ANNEE(${recordYear.value}2)="";2010;ANNEE(${recordYear.value}2))))`;
  formula.innerText = text;
}

function copyToClipboard() {
  console.log("Fonction de copie");
  const formula = document.querySelector("#formula").innerText;

  navigator.clipboard.writeText(formula).then(
    function () {
      alert("Le texte a été copié");
    },
    function () {
      alert("Le texte n'a pas été copié");
    }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const currentYearInput = document.querySelector("#current-year");
  currentYearInput.innerText = new Date().getFullYear();
  const columns = document.querySelectorAll(".entry");
  columns.forEach((element) =>
    element.addEventListener("change", updateformula)
  );
  updateformula();
  const copyBtn = document.querySelector("#copy");
  copyBtn.addEventListener("click", copyToClipboard);
});
