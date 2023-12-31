const currencyEl_one = document.querySelector("#currency-one");
const currencyEl_two = document.querySelector("#currency-two");
const amountEl_one = document.querySelector("#amount-one");
const amountEl_two = document.querySelector("#amount-two");

const rateEl = document.querySelector("#rate");
const swap = document.querySelector("#swap");

function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(
    // `https://v6.exchangerate-api.com/v6/43dd49fda6e8032cc0c64672/latest/${currency_one}`
    `https://api.exchangerate-api.com/v4/latest/${currency_one}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currencyEl_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

currencyEl_one.addEventListener("change", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
amountEl_two.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
