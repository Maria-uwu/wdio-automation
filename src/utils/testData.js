const sessionData = require("./sessionData");
const fs = require("fs");
const path = require("path");
const sessionDataPath = path.join(__dirname, "sessionData.json");

/*const testData = {
  user: {
    firstName: "Maria",
    lastName: "Vargas",
    dateOfBirth: "1996-05-04",
    street: "Via Molino Manas",
    postalCode: "123456",
    city: "Cajica",
    state: "Cundinamarca",
    phone: "3185172244",
    country: "Colombia",
    password: "Pa5sw0rd8901!",
  },

  updatedProfile: {
    phone: "3209876543",
    street: "Calle 123 #45-67, Bogotá",
  },
};
function generateRandomEmail() {
  const timestamp = Date.now();
  const newEmail = `user_${timestamp}@mail.com`;
  const password = "Pa5sw0rd8901!";

  fs.writeFileSync(
    sessionDataPath,
    JSON.stringify({ email: newEmail, password }, null, 2)
  );

  console.log("📩 Email generado y guardado:", newEmail);
  return newEmail;
}

module.exports = { testData, generateRandomEmail };*/

// --- Funciones auxiliares ---
function randomString(length) {
  const chars = "abcdefghijklmnopqrstuvwxyz";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

function randomNumber(length) {
  const nums = "0123456789";
  return Array.from(
    { length },
    () => nums[Math.floor(Math.random() * nums.length)]
  ).join("");
}

function randomEmail() {
  return `${randomString(5)}_${Date.now()}@mail.com`;
}

// --- Datos dinámicos del usuario ---
const testData = {
  user: {
    firstName: "Maria",
    lastName: "Vargas",
    dateOfBirth: "1996-05-04",
    street: `Calle ${randomNumber(2)} #${randomNumber(2)}-${randomNumber(2)}`,
    postalCode: randomNumber(6),
    city: "Cajicá",
    state: "Cundinamarca",
    phone: `3${randomNumber(9)}`,
    country: "Colombia",
    password: `Pa5sw0rd${randomNumber(3)}!`, // simple y seguro
  },

  updatedProfile: {
    phone: `3${randomNumber(9)}`,
    street: `Carrera ${randomNumber(2)} #${randomNumber(2)}-${randomNumber(2)}`,
  },
};

// --- Generador de email que guarda en archivo ---
function generateRandomEmail() {
  const newEmail = randomEmail();
  const password = testData.user.password;

  fs.writeFileSync(
    sessionDataPath,
    JSON.stringify({ email: newEmail, password }, null, 2)
  );

  console.log("📩 Email generado y guardado:", newEmail);
  return newEmail;
}

module.exports = { testData, generateRandomEmail };
