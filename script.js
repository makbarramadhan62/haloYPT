// cuaca

const apiKey = "2615f62cdde12bd7a64ffa2e3e0b90a6";
const city = "bandung";
const units = "metric";
const lang = "id";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;

// Fungsi untuk melakukan fetch dan memperbarui tampilan
function fetchAndDisplayWeather() {
  // Fetch data dari URL
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Memperbarui tampilan dengan informasi cuaca
      updateWeatherUI(data);
    })
    .catch((error) => {
      document.getElementById("error-message").textContent =
        "Error fetching OpenWeatherMap data";
      console.error("Error fetching OpenWeatherMap data:", error);
    });
}

// Fungsi untuk memperbarui tampilan informasi cuaca
function updateWeatherUI(weatherData) {
  const temperature = weatherData.main.temp.toFixed(0);
  const weatherDescription = weatherData.weather[0].description;
  const icon = weatherData.weather[0].icon;

  document.getElementById("temperature").textContent = temperature;
  document.getElementById("weather-description").textContent =
    weatherDescription;
}

// Pemanggilan pertama kali saat halaman dimuat
fetchAndDisplayWeather();

// Fetch data setiap satu jam
setInterval(fetchAndDisplayWeather, 3600000); // 3600000 milidetik = 1 jam

// waktu
const clockElement = document.getElementById("clock");
const dateElement = document.getElementById("date");

function updateDateTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const dayOfWeek = now.toLocaleString("id-ID", { weekday: "long" });
  const dayOfMonth = now.getDate();
  const month = now.toLocaleString("id-ID", { month: "long" });
  const year = now.getFullYear();

  // Format the time string with leading zeroes
  const timeStr = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // Format the date string
  const dateStr = `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`;

  // Update the clock and date elements
  clockElement.innerText = timeStr;
  dateElement.innerText = dateStr;
}

// Pemanggilan pertama kali saat halaman dimuat
updateDateTime();

// Set interval untuk memperbarui waktu dan tanggal setiap detik
setInterval(updateDateTime, 1000);

// slide berita
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const slideContainer = document.querySelector(".slide-container");

function showSlide(index) {
  const newTransformValue = -index * 100 + "%";
  slideContainer.style.transform = `translateX(${newTransformValue})`;
}

// Ganti slide setiap beberapa detik (misalnya, setiap 5 detik)
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 10000);
