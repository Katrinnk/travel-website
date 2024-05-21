// document
//   .getElementById("searchForm")
//   .addEventListener("submit", async function (e) {
//     e.preventDefault();
//     const name = document.getElementById("name").value;
//     const resultsDiv = document.getElementById("results");

//     console.log("lala");
//     // Clear previous results
//     resultsDiv.innerHTML = "";

//     // Build query string
//     let query = "";
//     if (name) query += `name=${name}`;
//     if (cuisine)
//       query += `${query ? "&" : ""}cuisine=${cuisine}`;

//     try {
//       const response = await fetch(`/dishes?${query}`);
//       const data = await response.json();
//       console.log("data", data);

//       if (data.message === "success") {
//         console.log(data);
//         // data.data.forEach((dish) => {
//         //   const dishDiv = document.createElement("div");
//         //   dishDiv.classList.add("dish");

//         //   const dishName = document.createElement("h2");
//         //   dishName.textContent = dish.name;

//         //   const dishDescription =
//         //     document.createElement("p");
//         //   dishDescription.textContent = dish.description;

//         //   const dishCuisine = document.createElement("p");
//         //   dishCuisine.textContent = `Cuisine: ${dish.cuisine}`;

//         //   dishDiv.appendChild(dishName);
//         //   dishDiv.appendChild(dishDescription);
//         //   dishDiv.appendChild(dishCuisine);

//         //   resultsDiv.appendChild(dishDiv);
//         // });
//       } else {
//         resultsDiv.textContent = "No dishes found";
//       }
//     } catch (error) {
//       console.error("Error fetching dishes:", error);
//       resultsDiv.textContent = "Error fetching dishes";
//     }
//   });
