const passwordForm = document.getElementById("passwordForm");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");

const charSets = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+[]{}|;:,.<>?/~`-="
};

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();

  copyMsg.textContent = "";
  copyBtn.disabled = true;

  const length = parseInt(document.getElementById("length").value);
  const includeUppercase = document.getElementById("uppercase").checked;
  const includeLowercase = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  let availableChars = "";
  if (includeUppercase) availableChars += charSets.uppercase;
  if (includeLowercase) availableChars += charSets.lowercase;
  if (includeNumbers) availableChars += charSets.numbers;
  if (includeSymbols) availableChars += charSets.symbols;

  if (!availableChars) {
    result.textContent = "Please select at least one character type.";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  result.textContent = password;
  copyBtn.disabled = false;
});

copyBtn.addEventListener("click", () => {
  if (!result.textContent) return;

  navigator.clipboard.writeText(result.textContent)
    .then(() => {
      copyMsg.textContent = "Copied to clipboard!";
      setTimeout(() => (copyMsg.textContent = ""), 2000);
    })
    .catch(() => {
      copyMsg.textContent = "Failed to copy.";
    });
});
