const initApp = ()=>{
    const name = document.getElementById('bame');
    const date = document.getElementById('date');
    const descWrite = document.getElementById('breif-desc')
    const desc = document.getElementById('Sdescriptions');
    const create = document.getElementById('kirkir');

    /*This is the object that conatain all the schedules*/
    let scheds = [{
        schedName: 'collecting money',
        schedDate: '23/3/2024',
        id: '1',
        description: 'gonna collect all the money today'
    },

    {
        schedName: 'Going to mosque',
        schedDate: '29/12/2024',
        id: '2',
        description: 'going to the mosque for the jumaat'
    }
    ];

    if (localStorage.getItem('schedules')) {
        scheds = JSON.parse(localStorage.getItem('schedules'));
    }



    localStorage.setItem('schedules', JSON.stringify(scheds))

    
    const render = () => {
        const MAIN = document.getElementById('SCHEDULES');
        MAIN.innerHTML = ''; 

        const Put = (index)=>{
            desc.innerText = scheds[index].description;

        }

        scheds.forEach((item, index) => {
            const indSched = document.createElement('div');
            indSched.classList.add('sched');
            indSched.addEventListener('click', ()=>{Put(index)})
            
            const description = document.createElement('div');
            description.classList.add('desc');
            
            const schedNameD = document.createElement('div');
            schedNameD.classList.add('name');
            const schedNameDP = document.createElement('p');
            schedNameDP.innerText = index + 1 + '. ' + item.schedName;
            schedNameD.appendChild(schedNameDP);

            const ico = document.createElement('div');
            ico.classList.add('ico');
            
            const icon = document.createElement('i');
            icon.classList.add('fa-solid', 'fa-ellipsis');
            icon.style.color = '#927fbf';
            ico.appendChild(icon);

            const DaTe = document.createElement('div');
            DaTe.classList.add('date');
            const DaTeP = document.createElement('p');
            DaTeP.innerText = item.schedDate;
            DaTe.appendChild(DaTeP);


            // Appending all the elements to their respective parents
            description.appendChild(schedNameD);
            description.appendChild(ico);
            indSched.appendChild(description);
            indSched.appendChild(DaTe);
            MAIN.appendChild(indSched);
        });
    };


    const Push = ()=>{
        scheds.push({
            schedName: name.value,
            schedDate: date.value,
            id:scheds.length + 1,
            description: descWrite.value
            });
        localStorage.setItem('schedules', JSON.stringify(scheds));
        render();
    }

    create.addEventListener('click', Push)


    render()

   

}

document.addEventListener('DOMContentLoaded', initApp)