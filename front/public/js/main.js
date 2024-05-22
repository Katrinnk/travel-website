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
    console.log("allTours", data);

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = ""; // Очистити попередні результати

    if (data.length > 0) {
      data.forEach((tour) => {
        const tourDiv = document.createElement("div");
        const tourDivClasses =
          "tour destination-item position-relative overflow-hidden mb-2 d-flex justify-content-center";
        tourDivClasses
          .split(" ")
          .forEach((cls) => tourDiv.classList.add(cls));

        const tourImg = document.createElement("img");
        tourImg.classList.add("img-fluid");
        tourImg.src = `${tour.main_img}`;

        const tourTextWrap = document.createElement("div");
        const tourTextWrapClasses =
          "destination-overlay text-white text-decoration-none";
        tourTextWrapClasses
          .split(" ")
          .forEach((cls) =>
            tourTextWrap.classList.add(cls)
          );

        const tourName = document.createElement("h5");
        tourName.classList.add("text-white");
        tourName.textContent = tour.name;

        const dishRegion = document.createElement("span");
        dishRegion.textContent = `Region: ${tour.region}`;

        tourDiv.appendChild(tourImg);
        tourDiv.appendChild(tourTextWrap);
        tourTextWrap.appendChild(tourName);
        //   tourDiv.appendChild(tourDescription);
        tourTextWrap.appendChild(dishRegion);

        resultsDiv.appendChild(tourDiv);
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

    console.log(query);

    try {
      const response = await fetch(
        `http://localhost:3000/tours?${query}`
      );
      const data = await response.json();
      console.log("data", data);

      if (data.message === "success") {
        console.log(data.data);
        // Clear previous results
        resultsDiv.innerHTML = "";
        data.data.forEach((tour) => {
          const tourDiv = document.createElement("div");
          const tourDivClasses =
            "tour destination-item position-relative overflow-hidden mb-2 d-flex justify-content-center";
          tourDivClasses
            .split(" ")
            .forEach((cls) => tourDiv.classList.add(cls));

          const tourImg = document.createElement("img");
          tourImg.classList.add("img-fluid");
          tourImg.src = `${tour.main_img}`;

          const tourTextWrap =
            document.createElement("div");
          const tourTextWrapClasses =
            "destination-overlay text-white text-decoration-none";
          tourTextWrapClasses
            .split(" ")
            .forEach((cls) =>
              tourTextWrap.classList.add(cls)
            );

          const tourName = document.createElement("h5");
          tourName.classList.add("text-white");
          tourName.textContent = tour.name;

          const dishRegion = document.createElement("span");
          dishRegion.textContent = `Region: ${tour.region}`;

          tourDiv.appendChild(tourImg);
          tourDiv.appendChild(tourTextWrap);
          tourTextWrap.appendChild(tourName);
          //   tourDiv.appendChild(tourDescription);
          tourTextWrap.appendChild(dishRegion);

          resultsDiv.appendChild(tourDiv);
        });
      } else {
        resultsDiv.textContent = "No dishes found";
      }
    } catch (error) {
      console.error("Error fetching dishes:", error);
      resultsDiv.textContent = "Error fetching dishes";
    }
  });
