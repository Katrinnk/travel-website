export function createTourElement(tour) {
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
    .forEach((cls) => tourTextWrap.classList.add(cls));

  const tourName = document.createElement("h5");
  tourName.classList.add("text-white");
  tourName.textContent = tour.name;

  const dishRegion = document.createElement("span");
  dishRegion.textContent = `Region: ${tour.region}`;

  tourDiv.appendChild(tourImg);
  tourDiv.appendChild(tourTextWrap);
  tourTextWrap.appendChild(tourName);
  tourTextWrap.appendChild(dishRegion);

  return tourDiv;
}
