function updateformula() {
  const columnN0 = document.querySelector("#columnN0");
  const columnN1 = document.querySelector("#columnN1");
  const lastLoan = document.querySelector("#lastLoan");
  const totalLoan = document.querySelector("#totalLoan");
  const recordYear = document.querySelector("#recordYear");
  const currentYear = document.querySelector("#current-year").innerText;
  const nextYear = parseInt(currentYear) + 1;

  const formula = document.querySelector("#formula");
  formula.children[0].innerText = `SI(${columnN0.value}2="";0;${columnN0.value})*1`;
  formula.children[1].innerText = `SI(${columnN1.value}2="";0;${columnN1.value})*0,5`;
  formula.children[2].innerText = `(50/(${nextYear}-SI(${recordYear.value}2="";2010;ANNEE(${recordYear.value}2))))`;
  formula.children[3].innerText = `(20/(${nextYear}-SI(${lastLoan.value}2="";2000;${lastLoan.value}2)))`;
  formula.children[4].innerText = `(${totalLoan.value}2/(${nextYear}-SI(${recordYear.value}2="";2010;ANNEE(${recordYear.value}2))))`;
  // const text =;
  // +\
  // +\
  // +\
  // `;
  // formula.innerText = text;
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
