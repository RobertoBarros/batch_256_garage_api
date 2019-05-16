const garage = 'pimp-my-ride';
const carsList = document.querySelector('.cars-list');
const url = `https://wagon-garage-api.herokuapp.com/${garage}/cars`;
const carHTML = (car) => {
 return  `<div class="car">
          <div class="car-image">
            <img src="http://loremflickr.com/280/280/${car.brand} ${car.model}" />
          </div>
          <div class="car-info">
            <h4>${car.brand} ${car.model}</h4>
            <p><strong>Owner:</strong>${car.owner}</p>
            <p><strong>Plate:</strong>${car.plate}</p>
            <p><a class='btn btn-danger delete' data-id=${car.id}>Delete</a></p>
          </div>
        </div>`
};

const loadCars = () => {
  carsList.innerHTML = '';
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      data.forEach((car) => {
        carsList.insertAdjacentHTML('beforeend', carHTML(car));
      });
      bindDeleteClick();
    });
};

const form = document.querySelector("#new-car");
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const brand = document.querySelector("#brand").value;
  const model = document.querySelector("#model").value;
  const owner = document.querySelector("#owner").value;
  const plate = document.querySelector("#plate").value;
  const car = {
    "brand": brand,
    "model": model,
    "owner": owner,
    "plate": plate
  };

  fetch(url, {method: 'POST',
  body: JSON.stringify(car),
  headers: {'Content-Type': 'application/json'}})
  .then(response => response.json())
  .then((data) => {
    loadCars();
    console.log(data);
  });

});

const destroyCar = (id) => {
  const deleteUrl = `https://wagon-garage-api.herokuapp.com/cars/${id}`;
  fetch(deleteUrl, {method: 'DELETE'})
    .then((data) => {
      loadCars();
    });
}

const bindDeleteClick = () => {
  document.querySelectorAll('.delete').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      destroyCar(event.currentTarget.dataset.id);
    })
  });
}

loadCars();