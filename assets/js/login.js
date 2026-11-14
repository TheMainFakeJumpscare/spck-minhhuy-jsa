if (localStorage.getItem("currentUser")) {
  location.href = "./index.html";
}

const form = document.querySelector("form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

function showMessage(text, type) {
  let loginMessage = document.getElementById("login-message");

  // Nếu HTML chưa có thẻ #login-message thì tự động tạo ngay dưới nút Sign In
  if (!loginMessage) {
    loginMessage = document.createElement("label");
    loginMessage.id = "login-message";
    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.insertAdjacentElement("afterend", loginMessage);
  }

  loginMessage.textContent = text;
  loginMessage.className = `login-message ${type}`;

  // Đảm bảo luôn hiển thị kể cả khi chưa cập nhật file login.css
  loginMessage.style.display = "block";
  loginMessage.style.marginTop = "0.85rem";
  loginMessage.style.padding = "0.65rem 0.9rem";
  loginMessage.style.borderRadius = "0.5rem";
  loginMessage.style.fontSize = "0.875rem";
  loginMessage.style.fontWeight = "500";
  loginMessage.style.textAlign = "center";

  if (type === "success") {
    loginMessage.style.color = "#214f52";
    loginMessage.style.backgroundColor = "#eef6f4";
    loginMessage.style.border = "1px solid #2f6f73";
  } else {
    loginMessage.style.color = "#c2410c";
    loginMessage.style.backgroundColor = "#fff5f2";
    loginMessage.style.border = "1px solid #f5c2b3";
  }
}

// Ẩn thông báo khi gõ lại
[emailInput, passwordInput].forEach((input) => {
  if (input) {
    input.addEventListener("input", () => {
      const loginMessage = document.getElementById("login-message");
      if (loginMessage) {
        loginMessage.style.display = "none";
        loginMessage.textContent = "";
      }
    });
  }
});

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usersRaw = localStorage.getItem("users");
    if (!usersRaw) {
      showMessage("No user found", "error");
      return;
    }

    const users = JSON.parse(usersRaw);
    const existingUser = users.find(
      (user) =>
        user.email &&
        user.email.toLowerCase() === emailInput.value.trim().toLowerCase() &&
        user.password === passwordInput.value.trim()
    );

    if (existingUser) {
      localStorage.setItem("currentUser", JSON.stringify(existingUser));
      showMessage("Sign in successful!", "success");

      setTimeout(() => {
        location.href = "./index.html";
      }, 600);
    } else {
      showMessage("Email or password is incorrect", "error");
    }
  });
}
