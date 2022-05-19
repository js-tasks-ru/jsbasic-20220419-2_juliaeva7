function highlight(table) {
  for (let i = 0; i < table.tBodies[0].rows.length; i++) {
            
    let row = table.tBodies[0].rows[i];
    
    if (!row.cells[3].hasAttribute('data-available')) {
        row.setAttribute('hidden', true);
    }
    else {
        row.classList.add((row.cells[3].getAttribute('data-available') === 'true') ? "available" : "unavailable");
    };

    row.classList.add((row.cells[2].textContent === 'f') ? "female" : "male");

    if (row.cells[1].textContent < 18) {
        row.style.textDecoration  = 'line-through';
    };

  };
}
