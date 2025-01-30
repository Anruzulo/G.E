document.addEventListener("DOMContentLoaded", () => {
  const formSections = document.querySelectorAll("#form-sections > div");
  const progress = document.getElementById("progress");
  const progressText = document.getElementById("progress-text"); 
  const prevButton = document.getElementById("prev-section");
  const nextButton = document.getElementById("next-section");
  const totalSections = formSections.length;
  let currentSection = 0;

  // Actualizar la barra de progreso
  const updateProgressBar = () => {
    const percentage = (currentSection / (totalSections - 1)) * 100;
    progress.style.width = percentage + "%";
    progressText.textContent = Math.round(percentage) + "%";
  };

  // Mostrar la seccion actual
  const updateSectionsVisibility = () => {
    formSections.forEach((section, index) => {
      section.style.display = index === currentSection ? "block" : "none";
    });

    updateProgressBar();

    prevButton.disabled = currentSection === 0;
    nextButton.style.display = currentSection === totalSections - 1 ? "none" : "inline-block";
  };

  // Mostrar fechas
  function formatDate(dateString) {
    const months = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto",
      "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const date = new Date(dateString);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} de ${month} ${year}`;
  }

  // Avanzar a la siguiente sección
  nextButton.addEventListener("click", () => {
    if (currentSection < totalSections - 1) {
      currentSection++;
      updateSectionsVisibility();
    }
  });

  // Retroceder a la sección anterior
  prevButton.addEventListener("click", () => {
    if (currentSection > 0) {
      currentSection--;
      updateSectionsVisibility();
    }
  });

  // Actualiza el contrato en tiempo real
  const inputs = document.querySelectorAll("[data-target]");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      const targetId = input.getAttribute("data-target");
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Input tipo fecha
        if (input.type === "date") {
          targetElement.textContent = input.value ? formatDate(input.value) : "________";
        }
        // Input tipo texto o select
        else if (input.type === "text" || input.tagName === "SELECT") {
          targetElement.textContent = input.value || "________";
        }
      }
    });
  });

  progress.style.width = "0%"; 
  progressText.textContent = "0%";
  updateSectionsVisibility();
});
