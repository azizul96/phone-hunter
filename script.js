const allPhone = (searchText) =>{
    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(response => response.json())
    .then(data => loadData(data.data))
}


const loadData = phones =>{
    const phonContainer = document.getElementById('phone-container')
    phonContainer.textContent = "";

    const showAllButton = document.getElementById('show-all-btn')
    if(phones.length > 12){
        showAllButton.classList.remove('hidden')
    }
    else{
        showAllButton.classList.add('hidden')
    }
    phones = phones.slice(0,12)
    

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
                    </div>
                 `
        phonContainer.appendChild(phoneCard)
    })
}

const searchHandle =() =>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    allPhone(searchText)
    
}
