function makeFriendsList(friends) {
  
  let newUl = document.createElement('UL');
  
  let newLi = document.createElement('LI');
        
  for (let item of friends) {
    let newLi = `<li>${item.firstName} ${item.lastName}</li>`;
    newUl.innerHTML += newLi;  
  };
        
  return newUl;

}
