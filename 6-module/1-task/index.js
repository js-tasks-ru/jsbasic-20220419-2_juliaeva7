

export default class UserTable {
      
      
  constructor(rows, elem = '') { 
    this.rows = rows;
    this.elem = this.getelem();
  }

  getelem() {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let th3 = document.createElement('th');
    let th4 = document.createElement('th');
    let th5 = document.createElement('th');
    let tb1 = document.createElement('td');
    let tb2 = document.createElement('td');
    let tb3 = document.createElement('td');
    let tb4 = document.createElement('td');
    let tb5 = document.createElement('td');
    let tr_head = document.createElement('tr');
    let tr = document.createElement('tr');
    
    table.appendChild(thead);
    thead.appendChild(tr_head);
    
    th1.textContent = 'Имя';
    tr_head.appendChild(th1);
    th2.textContent = 'Возраст';
    tr_head.appendChild(th2);
    th3.textContent = 'Зарплата';
    tr_head.appendChild(th3);
    th4.textContent = 'Город';
    tr_head.appendChild(th4);
    tr_head.appendChild(th5);
    
    table.appendChild(tbody);
    
    tbody.innerHTML = this.rows.map(item => {
       return `<tr>
         <td>${item.name}</td>
         <td>${item.age}</td>
         <td>${item.salary}</td>
         <td>${item.city}</td>
         <td><button>X</button></td>
       </tr>`
      }).join('');

      let buttons = tbody.querySelectorAll('button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', (event) => {this.deleteString(event); });
      };
          
    return table;
  }

  deleteString(event) {
    event.target.closest('tr').remove();
      
   }
}
