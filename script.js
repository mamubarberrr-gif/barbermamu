// Mamut Barber · Reservas por WhatsApp
// Cambia WHATSAPP_NUMBER si en el futuro quieres usar otro número.
// Formato internacional, sin +, espacios ni guiones.
const WHATSAPP_NUMBER = "34634368378";
const OPEN_DAYS = [1, 2, 3, 4, 5, 6]; // Lunes a sábado
const TIME_SLOTS = ["16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30"];

const dateInput = document.getElementById("bookingDate");
const slotsContainer = document.getElementById("timeSlots");
const selectedTimeInput = document.getElementById("selectedTime");
const bookingForm = document.getElementById("bookingForm");
const formError = document.getElementById("formError");

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

dateInput.min = localDateString();
document.getElementById("year").textContent = new Date().getFullYear();

function renderSlots() {
  slotsContainer.innerHTML = "";
  selectedTimeInput.value = "";
  formError.textContent = "";

  if (!dateInput.value) {
    slotsContainer.innerHTML = '<p class="slot-hint">Primero selecciona una fecha para ver los horarios.</p>';
    return;
  }

  // Construimos la fecha como fecha local para evitar desfases de zona horaria.
  const [year, month, day] = dateInput.value.split("-").map(Number);
  const chosenDate = new Date(year, month - 1, day);
  const dayOfWeek = chosenDate.getDay();

  if (dateInput.value < localDateString()) {
    slotsContainer.innerHTML = '<p class="slot-hint">Elige una fecha de hoy en adelante.</p>';
    return;
  }
  if (!OPEN_DAYS.includes(dayOfWeek)) {
    slotsContainer.innerHTML = '<p class="slot-hint">Los domingos estamos cerrados. Elige de lunes a sábado.</p>';
    return;
  }

  let availableSlots = TIME_SLOTS;
  if (dateInput.value === localDateString()) {
    const now = new Date();
    availableSlots = TIME_SLOTS.filter((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      const slotDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
      return slotDate > now;
    });
  }

  if (!availableSlots.length) {
    slotsContainer.innerHTML = '<p class="slot-hint">Ya no quedan horas para hoy. Prueba con otro día.</p>';
    return;
  }

  availableSlots.forEach((time) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "time-slot";
    button.textContent = time;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => {
      slotsContainer.querySelectorAll(".time-slot").forEach((slot) => {
        slot.classList.remove("selected");
        slot.setAttribute("aria-pressed", "false");
      });
      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");
      selectedTimeInput.value = time;
      formError.textContent = "";
    });
    slotsContainer.appendChild(button);
  });
}

dateInput.addEventListener("change", renderSlots);

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const date = dateInput.value;
  const time = selectedTimeInput.value;

  if (!name) {
    formError.textContent = "Escribe tu nombre para continuar.";
    return;
  }
  if (!date) {
    formError.textContent = "Selecciona el día de tu cita.";
    return;
  }
  if (!time) {
    formError.textContent = "Selecciona una hora disponible.";
    return;
  }

  const [year, month, day] = date.split("-");
  const formattedDate = `${day}/${month}/${year}`;
  const message = [
    "¡Hola, Mamut Barber! Quiero solicitar una cita.",
    "",
    `Nombre: ${name}`,
    phone ? `Teléfono: ${phone}` : "",
    `Fecha: ${formattedDate}`,
    `Hora: ${time}`,
    "Servicio: Corte de pelo",
    "Precio: 5 €",
    "",
    "¿Me confirmáis si está disponible? ¡Gracias!"
  ].filter(Boolean).join("\n");

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
});

// Menú móvil
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

renderSlots();
