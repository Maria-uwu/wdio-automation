const sessionData = require("./sessionData");
const fs = require("fs");
const path = require("path");
const sessionDataPath = path.join(__dirname, "sessionData.json");

const testData = {
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

module.exports = { testData, generateRandomEmail };
