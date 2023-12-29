const initApp = ()=>{
    const name = document.getElementById('name');
    const date = document.getElementById('date');
    const desc = document.getElementById('breif-desc');
    const create = document.getElementById('kirkir');

    /*This is the object that conatain all the schedules*/
    let scheds = [{
        schedName: 'collecting money',
        schedDate: '23/3/2024',
        id: '1'
    },

    {
        schedName: 'Going to mosque',
        schedDate: '29/12/2024',
        id: '2'
    }
    ];

    localStorage.setItem('schedules', JSON.stringify(scheds))

    
    const render = () => {
        const SCD = JSON.parse(localStorage.getItem('schedules'));

        const MAIN = document.getElementById('SCHEDULES');
        MAIN.innerHTML = ''; 

        SCD.forEach((item, index) => {
            const indSched = document.createElement('div');
            indSched.classList.add('sched');
            
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

            // Append all elements to their respective parents
            description.appendChild(schedNameD);
            description.appendChild(ico);
            indSched.appendChild(description);
            indSched.appendChild(DaTe);
            MAIN.appendChild(indSched);
        });
    };


    render()
}

document.addEventListener('DOMContentLoaded', initApp)