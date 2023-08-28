const allPhone = (searchText, isShowAll) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(response => response.json())
    .then(data => loadData(data.data, isShowAll))
}


const loadData = (phones, isShowAll) =>{
    const phonContainer = document.getElementById('phone-container')
    phonContainer.textContent = "";

    const showAllButton = document.getElementById('show-all-btn')
    if(phones.length > 12 && !isShowAll){
        showAllButton.classList.remove('hidden')
    }
    else{
        showAllButton.classList.add('hidden')
    }
    
    if(!isShowAll){
        phones = phones.slice(0,12)
    }
    

    phones.forEach(phoneElement => {
        // console.log(phoneElement)

        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-base-100 rounded-lg border`
        phoneCard.innerHTML = `
                    <figure class=" m-2 px-5 py-5">
                        <img src="${phoneElement.image}" alt="" class="max-h-32 rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        
                        <h2 id="card1-name" class="text-[#111] font-semibold">${phoneElement.phone_name}</h2>
                        <p class="text-[#111] opacity-70">${phoneElement.brand}</p>
                        <button onclick="detailsHandler('${phoneElement.slug}')" class="btn btn-accent btn-sm text-white">Details</button>
                    </div>
                 `
        phonContainer.appendChild(phoneCard)
    })
    toggleSpinner(false)
}

const detailsHandler = (id) =>{
    console.log('clicked' ,id);
    const modalData = fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(response => response.json())
    .then(detailsData => showModalDetails(detailsData.data) )
    
}
const showModalDetails = (details) => {
    console.log(details);
    show_modal.showModal()
    const modalContainer = document.getElementById('modal-container')
    modalContainer.innerHTML = `
    
    <div class=" flex justify-center" >
    <img src="${details.image}" alt="" class="max-h-32 rounded-xl  " />
    </div>
    <h3 class="font-bold text-lg text-center ">${details.name}</h3>
    <p><span class="font-semibold">Storage: </span>${details.mainFeatures.storage}</p>
    <button class="mt-5 btn btn-accent btn-sm text-white bg-red-600 border-none ">Close</button>
    `
    
}



const searchHandle =(isShowAll) =>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    allPhone(searchText, isShowAll)
    
}

const toggleSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }

}

const HandleShowAll = () => {
    searchHandle(true)
}