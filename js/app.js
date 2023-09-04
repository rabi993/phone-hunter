const loadPhones = async(searchText, dataLimit) =>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent ='';
    //display 6 phone only
    // phones =phones.slice(0, 6);
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 6){
        phones =phones.slice(0, 6);
        
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');

    }

    //display no phone found
    const noPhone = document.getElementById('no-found-message');
    if(phones.length===0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    //display all phones
    phones.forEach( phone =>{
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML= `
        <div class="card ">
                        <img src="${phone.image}" class="card-img-top p-4" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick = "loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                          
                        </div>
                      </div>
        `;
        phonesContainer.appendChild(phoneDiv);

    })
    //stop Spinner or loader
    toggleSpinner(false);
}

const processSearch = (dataLimit)=>{
    toggleSpinner(true);
    const searchField =document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

//handle search button click
document.getElementById('btn-search').addEventListener('click', function(){
    //start loader
    // toggleSpinner(true);
    // const searchField =document.getElementById('search-field');
    // const searchText = searchField.value;
    // loadPhones(searchText);
    processSearch(6);
})

// search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function(event){
    if(event.key === 'Enter'){
        //code for enter
        processSearch(6);
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');

    }
    else{
        loaderSection.classList.add('d-none');
    }

}
//not the best way to show all
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();


})

const loadPhoneDetails =  async(id) => {
    const url =`https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}

const displayPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML =`
    <p>ReleaseDate:${ phone.releaseDate ? phone.releaseDate : 'No releaseDate found'} </p> 
    <p>Storage:${ phone.mainFeatures.storage
        } </p> 
    <p>sensors: ${ phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] +', '+phone.mainFeatures.sensors[1]+', '+phone.mainFeatures.sensors[2]+', '+phone.mainFeatures.sensors[3]+', '+phone.mainFeatures.sensors[4]+', '+phone.mainFeatures.sensors[5] : 'No sensor'
        } </p> 
    
    <p>displaySize: ${ phone.mainFeatures.displaySize
        } </p> 
    <p>Bluetooth: ${ phone.others ? phone.others.Bluetooth : 'no bluetooth information'
        
        } </p> 
    `;
}

// loadPhones('apple');
