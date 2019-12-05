const toggleImg = () => {
  const commandId = document.getElementById('command'),
    setSrc = (trgt) => {
      const src = trgt.getAttribute('src');
      trgt.setAttribute('src',trgt.dataset.img);
      trgt.dataset.img = src;
    };

  commandId.addEventListener('mouseover', (event) => {
    let target = event.target;
    
    target = target.closest('img');
   
    if (target) { 
      setSrc(target);
    }
  });

  commandId.addEventListener('mouseout', (event) => {
    let target = event.target;

    target = target.closest('img');

    if (target) { 
      setSrc(target);
    }
  });
};

export default toggleImg;