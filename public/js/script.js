function adicionar() {
    Swal.fire(
        'Muito Bom!',
        'Voce adicionou um novo estilo de Unhas!',
        'sucesso'
      )
}


const closeAlert = () =>{
  const close = document.querySelector('#close-message');
  const message = document.querySelector(".message");

  close.addEventListener("click", ()=>{
      message.style.display =  "none";
  });

  setTimeout(()=> {
      messagem.style.display = "none";
  }, 5000
  )
}