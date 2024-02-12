const initApp = ()=>{
    const name = document.getElementById('bame');
    const date = document.getElementById('date');
    const descWrite = document.getElementById('breif-desc')
    const desc = document.getElementById('Sdescriptions');
    const create = document.getElementById('kirkir');
    const trash = document.getElementById('trash');
    const set_on = document.getElementById('set-on');
    const sunday = document.getElementById('sun');
    const monday = document.getElementById('mon');
    const tuesday = document.getElementById('tues');
    const wednesday = document.getElementById('wed');
    const thursday = document.getElementById('thur');
    const friday = document.getElementById('fri');
    const saturday = document.getElementById('sat');
    const comp = document.getElementById('comp');
    const edit = document.getElementById('edit');
    const modify = document.getElementById('modify');

    function getCurrentDayName() {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date().getDay();
        return daysOfWeek[today];
      }
      
      const currentDay = getCurrentDayName();
      
      if(currentDay == 'Sunday'){
        sunday.classList.add('kamp')
      }
      else if(currentDay == 'Monday'){
        monday.classList.add('kamp')
      }
      else if(currentDay == 'Tuesday'){
        tuesday.classList.add('kamp')
      }
      else if(currentDay == 'Wednesday'){
        wednesday.classList.add('kamp')
      }
      else if(currentDay == 'Thursday'){
        thursday.classList.add('kamp')
      }
      else if(currentDay == 'Friday'){
        friday.classList.add('kamp')
      }
      else if(currentDay == 'Saturday'){
        saturday.classList.add('kamp')
      }
      else{
        return null
      }
      

    
    let scheds = [
    ];

    if (localStorage.getItem('schedules')) {
        scheds = JSON.parse(localStorage.getItem('schedules'));
    }



    localStorage.setItem('schedules', JSON.stringify(scheds))

    let id = 0;
    let indSchedId = ''
    

    function daysBetweenDates(date1, date2) {
        const oneDay = 1000 * 60 * 60 * 24;
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / oneDay);
      
        return diffDays;
    }


    let getTodayDate = ()=> {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
      
        return `${year}-${month}-${day}`;
      }

    
    const render = () => {
        const MAIN = document.getElementById('SCHEDULES');
        MAIN.innerHTML = ''; 
 
        const Put = (index) => {
            desc.innerText = scheds[index].description;
            set_on.innerText = scheds[index].setDate;
        
            const firstDate = new Date(scheds[index].setDate);
            const todayDate = new Date();
            const scheduledDate = new Date(scheds[index].schedDate);
          
            const totalSpan = daysBetweenDates(firstDate, scheduledDate);
            const daysPast = daysBetweenDates(firstDate, todayDate);
          
            const progress = document.getElementById('progress');
            const pass = document.getElementById('pass')
            const maxProgressBarWidth = 80;
        
            const percentage = Math.min(Math.max((daysPast / totalSpan) * 100, 0), 100);
            const progressWidth = Math.min((percentage * maxProgressBarWidth) / 100, maxProgressBarWidth);
          
            progress.style.width = `${progressWidth}%`;
            pass.innerText = progressWidth % 1 !== 0 ? progressWidth.toFixed(1) + "%": progressWidth + "%"
        };
        
        
        scheds.forEach((item, index) => {
            const indSched = document.createElement('div');
            indSched.classList.add('sched');
            indSched.id = item.id;
            const schedId = indSched.id
            if(item.komp){
                indSched.classList.add('completed')
            }
            indSched.addEventListener('click', ()=>{
                Put(index)
                id = scheds[index].id
                indSchedId = schedId
            })
            
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
    render()


    
    
    const Push = ()=>{
          const currentDate = getTodayDate();
        scheds.push({
            schedName: name.value,
            schedDate: date.value,
            id:scheds.length + 1 + '',
            description: descWrite.value,
            setDate: currentDate,
            komp: false
            });
        localStorage.setItem('schedules', JSON.stringify(scheds));
        render();
    }
    create.addEventListener('click', Push);

    let check = false;

    
    const Delete = ()=>{ 
        if(check){
            scheds = scheds.filter((item)=> item.id !== id)
            localStorage.setItem('schedules', JSON.stringify(scheds));
            check = false;
            render()
        }
    }

    trash.addEventListener('click',()=>{ 
        check = true;
        Delete();
    })

    let completed = false;

    const Complete = ()=>{
        if(completed){
            const schedObject = document.getElementById(indSchedId);
            schedObject.classList.add('completed');
            let scheds = JSON.parse(localStorage.getItem('schedules'));
            scheds[id - 1].komp = true;
            localStorage.setItem('schedules', JSON.stringify(scheds))
            render()
            completed = false
        }
    }

    comp.addEventListener('click', ()=>{
        completed = true;
        Complete()
    })

    let editCheck = false;

    const Edit = ()=>{
        if(editCheck){
            scheds = JSON.parse(localStorage.getItem('schedules'))
            name.value = scheds[id - 1].schedName;
            date.value = scheds[id - 1].schedDate;
            descWrite.value = scheds[id - 1].description;
            create.classList.add('kill')
            modify.classList.remove('modify')
            modify.classList.add('modify-on')
            editCheck = false;
        }
    }

    edit.addEventListener('click', ()=>{
        editCheck = true;
        Edit()
    })

    const Modify = ()=>{
        scheds = scheds.filter((item)=> item.id !== id)
        let getTodayDate = ()=> {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
          
            return `${year}-${month}-${day}`;
          }
          const currentDate = getTodayDate();
        scheds.splice((id - 1), 0, {
            schedName: name.value,
            schedDate: date.value,
            id:scheds.length + 1 + '',
            description: descWrite.value,
            setDate: currentDate,
            komp: false
            });
        create.classList.remove('kill')
        modify.classList.remove('modify-on')
        modify.classList.add('modify')
        localStorage.setItem('schedules', JSON.stringify(scheds));
        render()
        window.location.reload()
    }

    modify.addEventListener('click', Modify);

    
      
      
      
      

    

   

}

document.addEventListener('DOMContentLoaded', initApp)