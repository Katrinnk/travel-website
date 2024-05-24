(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this)
              .trigger("click")
              .blur();
          });
      } else {
        $(".navbar .dropdown")
          .off("mouseover")
          .off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate(
      { scrollTop: 0 },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    margin: 30,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

async function fetchAllTours() {
  try {
    const response = await fetch(
      "http://localhost:3000/tours/all"
    );
    const data = await response.json();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Очистити попередні результати

    if (data.length > 0) {
      data.forEach((tour) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add(
          "col-lg-4",
          "col-md-6",
          "mb-4"
        );

        const tourDiv = document.createElement("div");
        tourDiv.classList.add(
          "tour",
          "destination-item",
          "position-relative",
          "overflow-hidden",
          "d-flex",
          "justify-content-center"
        );
        tourDiv.setAttribute("data-toggle", "modal");
        tourDiv.setAttribute("data-target", "#tourModal");

        const tourImg = document.createElement("img");
        tourImg.src = tour.main_img;
        tourImg.classList.add("img-fluid");
        tourImg.style.height = "200px";
        tourImg.style.width = "100%";
        tourImg.style.objectFit = "cover";

        const tourTextWrap = document.createElement("div");
        tourTextWrap.classList.add(
          "destination-overlay",
          "text-white",
          "text-decoration-none"
        );

        const tourName = document.createElement("h5");
        tourName.classList.add("text-white");
        tourName.textContent = tour.name;

        const tourRegion = document.createElement("span");
        tourRegion.textContent = `Region: ${tour.region}`;

        tourTextWrap.appendChild(tourName);
        tourTextWrap.appendChild(tourRegion);

        tourDiv.appendChild(tourImg);
        tourDiv.appendChild(tourTextWrap);

        colDiv.appendChild(tourDiv);
        resultsDiv.appendChild(colDiv);

        tourDiv.addEventListener("click", function () {
          const modalTitle = document.getElementById(
            "tourModalTitle"
          );
          const modalBody =
            document.getElementById("tourModalBody");
          modalTitle.textContent = tour.name;
          modalBody.innerHTML = `
            <p><strong>Region:</strong> ${tour.region}</p>
            <p><strong>Description:</strong> ${
              tour.description ||
              "No description available."
            }</p>
            <a href='${
              tour.location
            }' target='_blank'><p class='text-center'>Location</p></a>
            <img src="${
              tour.main_img
            }" class="img-fluid" alt="${tour.name}">
            <img src="${
              tour.imgs[0]
            }" class="img-fluid" alt="${tour.name}">
            <img src="${
              tour.imgs[1]
            }" class="img-fluid" alt="${tour.name}">
            <img src="${
              tour.imgs[2]
            }" class="img-fluid" alt="${tour.name}">
          `;
        });
      });
    } else {
      resultsDiv.textContent = "No tours found";
    }
  } catch (error) {
    console.error("Error fetching tours:", error);
    const resultsDiv = document.getElementById("results");
    resultsDiv.textContent = "Error fetching tours";
  }
}

document.addEventListener(
  "DOMContentLoaded",
  fetchAllTours
);

// Виклик функції при завантаженні сторінки
document.addEventListener(
  "DOMContentLoaded",
  fetchAllTours
);

document
  .getElementById("searchForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const region = document.getElementById("region").value;
    const resultsDiv = document.getElementById("results");

    // Build query string
    let query = "";
    if (name) query += `name=${name}`;
    if (region)
      query += `${query ? "&" : ""}region=${region}`;

    console.log("city", name);

    try {
      const response = await fetch(
        `http://localhost:3000/tours?${query}`
      );
      const data = await response.json();

      if (data.message === "success") {
        resultsDiv.innerHTML = "";
        data.data.forEach((tour) => {
          const colDiv = document.createElement("div");
          colDiv.classList.add(
            "col-lg-4",
            "col-md-6",
            "mb-4"
          );

          const tourDiv = document.createElement("div");
          tourDiv.classList.add(
            "tour",
            "destination-item",
            "position-relative",
            "overflow-hidden",
            "d-flex",
            "justify-content-center"
          );
          tourDiv.setAttribute("data-toggle", "modal");
          tourDiv.setAttribute("data-target", "#tourModal");

          const tourImg = document.createElement("img");
          tourImg.src = tour.main_img;
          tourImg.classList.add("img-fluid");
          tourImg.style.height = "200px";
          tourImg.style.width = "100%";
          tourImg.style.objectFit = "cover";

          const tourTextWrap =
            document.createElement("div");
          tourTextWrap.classList.add(
            "destination-overlay",
            "text-white",
            "text-decoration-none"
          );

          const tourName = document.createElement("h5");
          tourName.classList.add("text-white");
          tourName.textContent = tour.name;

          const tourRegion = document.createElement("span");
          tourRegion.textContent = `Region: ${tour.region}`;

          tourTextWrap.appendChild(tourName);
          tourTextWrap.appendChild(tourRegion);

          tourDiv.appendChild(tourImg);
          tourDiv.appendChild(tourTextWrap);

          colDiv.appendChild(tourDiv);
          resultsDiv.appendChild(colDiv);

          tourDiv.addEventListener("click", function () {
            const modalTitle = document.getElementById(
              "tourModalTitle"
            );
            const modalBody =
              document.getElementById("tourModalBody");
            modalTitle.textContent = tour.name;
            modalBody.innerHTML = `
              <p><strong>Region:</strong> ${tour.region}</p>
              <p><strong>Description:</strong> ${
                tour.description ||
                "No description available."
              }</p>
              <a href='${
                tour.location
              }' target='_blank'><p class='text-center'>Location</p></a>
              <img src="${
                tour.main_img
              }" class="img-fluid" alt="${tour.name}">
              <img src="${
                tour.imgs[0]
              }" class="img-fluid" alt="${tour.name}">
              <img src="${
                tour.imgs[1]
              }" class="img-fluid" alt="${tour.name}">
              <img src="${
                tour.imgs[2]
              }" class="img-fluid" alt="${tour.name}">
            `;
          });
        });
      } else {
        resultsDiv.textContent = "No dishes found";
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
      resultsDiv.textContent = "Error fetching dishes";
    }
  });
