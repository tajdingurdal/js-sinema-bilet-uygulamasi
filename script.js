var container = document.querySelector(".container")
let count = document.querySelector(".text").querySelector("#count")
let amount = document.querySelector(".text").querySelector("#amount")
let movie = document.querySelector("#movie")
let biletFiyati = document.querySelector(".bilet-fiyat")
const seats = document.querySelectorAll(".seat:not(.reserved)")

biletFiyati.innerText = `Bilet Fiyatı: ${20} ₺`


getFromLocalStorage()
calculateTotal()

container.addEventListener("click", function (e) { // event eklemek için önce en üstteki elemente ulaştık.

    if (e.target.className === "seat") {
        e.target.className = "seat selected"
    } else if (e.target.className === "seat selected") {
        e.target.className = "seat"
    }

    let selectedSeatCount = container.querySelectorAll(".seat.selected").length;
    count.innerText = selectedSeatCount
    amount.innerText = movie.value * selectedSeatCount + " ₺"

    calculateTotal()
})


movie.addEventListener("change", function (e) {

    if (movie.value == 20) {
        biletFiyati.innerText = `Bilet Fiyatı: ${20} ₺`
    } else if (movie.value == 10) {
        biletFiyati.innerText = `Bilet Fiyatı: ${10} ₺`
    } else if (movie.value == 40) {
        biletFiyati.innerText = `Bilet Fiyatı: ${40} ₺`
    }
    calculateTotal()
})

function calculateTotal() {
    const selectedSeats = container.querySelectorAll(".seat.selected")

    const selectedSeatArr = []
    const seatsArr = []

    selectedSeats.forEach(function (seat) {
        selectedSeatArr.push(seat)
    })

    seats.forEach(function (seat) {
        seatsArr.push(seat)
    })

    let selectedSeatIndex = selectedSeatArr.map(function (seat) {
        return seatsArr.indexOf(seat)
    })
    /*Tüm seat'leri bir diziye attık. Sonra tüm seçili olan seat'leri de başka bir diziye attık. 
    Sonra tüm seat'lerin olduğu diziye dedik ki, bu seçili olan seat'in index değeri nedir? 
    Seçili seatlerin indeks değerlerini tüm seatler içerisinde buluyoruz ve seçili seatlerin indeks değerlerini başka bir arraye atıyoruz. 
    Bu arrayıda local storage içerisinde kayıt ediyoruz.
     */

    // save to local storage
    localStorage.setItem("selectedItems", JSON.stringify(selectedSeatIndex))
    localStorage.setItem("selectedMovie", JSON.stringify(movie.selectedIndex))

    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount
    amount.innerText = movie.value * selectedSeatCount + " ₺"
}

function getFromLocalStorage() {

    let selectedSeats = JSON.parse(localStorage.getItem("selectedItems"))

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, index) {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected")
            }
        })
    }


    let selectedMovieIndex = localStorage.getItem("selectedMovie")

    if (selectedMovieIndex != null) {
        movie.selectedIndex = selectedMovieIndex;
    }

}
