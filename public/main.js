const submitbtn = document.getElementById('submitbtn');

const states = document.getElementById('state');
const districts = document.getElementById('district');

districts.disabled = true;

const active = document.getElementById('active');
const confirmed = document.getElementById('confirmed');
const deceased = document.getElementById('deceased');
const recovered = document.getElementById('recovered');

const stname = document.getElementById('stname');
const disname = document.getElementById('disname');

const url = "https://data.covid19india.org/district_wise.json";


const fetchCovidData = async (e) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const arr = data.districts;
        console.log(arr);

        let output_states = "";
        let output_district = "";
        let setState = new Set();
        let setDistrict = new Set();

        arr.forEach(element => {
            setState.add(element.state);
            setDistrict.add(element.district);

        });

        setState.forEach(st => {
            // console.log(st);
            output_states += `<option value="${st}">${st}</option>`
        })

        states.innerHTML = output_states;

        states.onchange = () => {
            districts.disabled = false;
            states.disabled = true;
            arr.forEach(element => {
                if (element.state == states.value) {
                    // console.log(states.value);
                    output_district += `<option value="${element.district}">${element.district}</option>`;
                    districts.innerHTML = output_district;
                }
            });
            stname.innerText = states.value;
        }

        districts.onchange = () => {
            arr.forEach(element => {
                if (element.district == districts.value) {
                    // console.log(element.district);
                    active.innerHTML = element.active;
                    confirmed.innerHTML = element.confirmed;
                    deceased.innerHTML = element.deceased;
                    recovered.innerHTML = element.recovered;
                }
            });
            disname.innerText = districts.value + " , "; 
        }
    } catch (error) {
        console.log(error);
    }
}
fetchCovidData();

const refresh = () => {
    window.location.reload();
}

submitbtn.addEventListener('click' , refresh);