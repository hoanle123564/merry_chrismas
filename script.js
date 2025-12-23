const showButton = document.getElementById("showButton");
const christmasMessage = document.getElementById("as");

// Xử lý ẩn/hiện thông điệp Giáng sinh khi bấm nút "Thiệp nè"
showButton.addEventListener("click", function () {
  if (christmasMessage.style.display === "none") {
    christmasMessage.style.display = "block";
  } else {
    christmasMessage.style.display = "none";
  }
});

// Xử lý khi bấm nút đóng (closeButton)
document.getElementById("closeButton").addEventListener("click", function () {
  // Hiện lại thông điệp chính
  document.getElementById("as").style.display = "block";

  var guideInfo = document.getElementById("guideInfo");
  var button = document.getElementById("showButton");

  // Hiệu ứng đóng thiệp
  guideInfo.classList.remove("show");
  setTimeout(function () {
    guideInfo.classList.add("hidden");
    button.classList.remove("hidden");
  }, 500);
});

// Xử lý mở thiệp khi bấm nút "Thiệp nè" - Khởi động hệ thống 3D
document.getElementById("showButton").addEventListener("click", function () {
  // Ẩn tất cả các elements ban đầu
  document.getElementById("as").style.display = "none";
  document.querySelector(".t-container").style.display = "none";
  document.querySelector(".container").style.display = "none";
  document.getElementById("guideInfo").style.display = "none";

  // Hiển thị các elements cho 3D scene
  document.getElementById("canvas-container").style.display = "block";
  document.getElementById("status").style.display = "inline-block";
  document.querySelector(".guide").style.display = "block";

  // Giữ lại hiệu ứng tuyết rơi - KHÔNG ẩn snowflakes

  // Phát nhạc
  if (typeof bgMusic !== "undefined") {
    bgMusic.play().catch((e) => console.log(e));
  }

  // Khởi động 3D scene ngay lập tức
  if (typeof init3D === "function") {
    init3D();
  }

  // Khởi động camera sau (optional)
  setTimeout(() => {
    if (typeof startCamera === "function") {
      document.getElementById("camera-preview").style.display = "block";
      startCamera();
    }
  }, 1000);
});

// Hiệu ứng rung con mèo khi di chuột vào
const treeIcon = document.querySelector(".cat-image");

if (treeIcon) {
  treeIcon.addEventListener("mouseenter", function () {
    treeIcon.classList.add("shake-animation");
  });

  treeIcon.addEventListener("animationend", function () {
    treeIcon.classList.remove("shake-animation");
  });
}

// Chức năng tạo hiệu ứng tuyết rơi
function createSnowflakes() {
  const snowflakesContainer = document.createElement("div");
  snowflakesContainer.classList.add("snowflakes");
  document.body.appendChild(snowflakesContainer);

  for (let i = 0; i < 100; i++) {
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");

    // Ngẫu nhiên hình dáng tuyết (tròn, sao, hoặc kim cương)
    const shape = Math.random();
    if (shape < 0.33) {
      snowflake.classList.add("star");
    } else if (shape < 0.66) {
      snowflake.classList.add("diamond");
    }

    // Thiết lập các thuộc tính ngẫu nhiên cho từng hạt tuyết
    const size = Math.random() * 10 + 5;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
    snowflake.style.animationDelay = `${Math.random() * 5}s`;
    snowflake.style.setProperty("--random-x", Math.random());

    snowflakesContainer.appendChild(snowflake);
  }
}

// Chạy hiệu ứng tuyết khi trang web tải xong
window.onload = createSnowflakes;
