
const filter = async () => {
    const filterDiv = document.getElementById('filter-list').children;
    const filterList = [];

    if (!filterDiv.length==0) {
        for (let container of filterDiv) {         
            filterList.push(container.children[0].innerHTML);
        }
    }

    let file = await fetch('./data.json');
    jobs = await file.json()
    filteredJobs = []


    for (let job of jobs) {
        let state = true
        const requirements = job.languages.concat(job.tools, job.role, job.level);
        for (let filter of filterList) {
            if (!requirements.includes(filter)) {
                state = false
            }
        }
        if (state) {
            filteredJobs.push(job)
        }
    }
    displayer(filteredJobs)
    clicks()

}
filter()

function displayer(jobs) {
    let cardContainer = document.getElementById('card-container');
    cardContainer.textContent = ''

    for (let job of jobs) {
        const card = document.createElement(`div`);
        card.classList.add('card')
        card.innerHTML = 
        `
        <img class="card__image" src="./${job.logo}" alt="${job.company}" width="65px">`
        const cardTop = document.createElement(`div`);
        cardTop.classList.add('card__top');
        cardTop.innerHTML = 
        `<h3 class="card__tool">${job.company}</h3>`
        
        if (job.new) {
            cardTop.innerHTML += `<div class="card__extra card__new-item">${'New!'}</div>`
        }
        if (job.featured) {
            cardTop.innerHTML += `     
            <div class="card__extra card__featured">${'featured'}</div>`
        }
        card.appendChild(cardTop)
        card.innerHTML +=
        `
        <p class="card__role-level">${job.position}</p>
    
        <ul class="card__description">
          <li><span class="card__time">${job.postedAt}</span></li>
          <li><span class="card__hours">${job.contract}</span></li>
          <li><span class="card__country">${job.location}</span></li>
        </ul>
        `
        const cardExpertise = document.createElement(`div`);
        cardExpertise.classList.add('card__expertise');
        cardExpertise.innerHTML = 
        `
        <span class="card__role filter">${job.role}</span>
        <span class="card__level filter">${job.level}</span>
        `
        const requirements = job.languages.concat(job.tools)
        for (let requirement of requirements) {
            cardExpertise.innerHTML += `<span class="card__language filter">${requirement}</span>`
        }
        card.appendChild(cardExpertise)

       
        cardContainer.appendChild(card)
    } 
}

function clicks() {
    let options = document.querySelectorAll('.filter');
    options.forEach(el => {
        el.addEventListener('click', stope)
    })
}


function stope() {
    const filterList = document.getElementById('filter-list');
    const nodes = filterList.children;
    const filterItem = this.cloneNode(true);
    // filterItem.classList.add('filt')
    const remove = document.createElement('div')
    remove.classList.add('remove')
    const container = document.createElement('div')
    container.classList.add('filter__div');
    container.appendChild(filterItem);
    container.appendChild(remove);
    
    if (!nodes.length) {
        filterList.appendChild(container);
    }
    else {
        let state = true
        for (let node of nodes) {
            if (node.children[0].innerHTML===this.innerHTML) {
                state = false
            }
        }
        if (state) {
            filterList.appendChild(container);
        }
    }
    filter()
}