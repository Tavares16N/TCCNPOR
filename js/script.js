
/*---------------------------- alternar ícone da barra de navegação  -------------------------------------*/
let menuIcon = document.querySelector('#menu-icone');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('action');
};

/*---------------------------- link ativo das seções de rolagem ------------------------------------------*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('action');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('action');
            });
        };
    });

    /*---------------------------- barra de navegação  ------------------------------------------*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*------- remover o ícone de alternância é a barra de navegação ao clicar na barra de navegação  ----*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('action');
};

/*---------------------------- revelar rolagem  ------------------------------------------*/
ScrollReveal({
    //reset: true,
    distance:'80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.inicio-conteudo, .cabecalho', { origin: 'top' });
ScrollReveal().reveal('.servicos-conteudo, .portifolio-box, .contato form', { origin: 'bottom' });
ScrollReveal().reveal('.inicio-conteudo h1, .sobre-imagem', { origin: 'left' });
ScrollReveal().reveal('.inicio-conteudo p, .sobre-conteudo', { origin: 'right' });

/*---------------------------- texto multiplo  ------------------------------------------*/
const typed = new Typed('.multiplo-texto', {
    strings : ['Tavares','Wenceslau','Augusto','Miquéias','Salazar'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});



/*-------------------------SEND MESSAGE WITH TELEGRAM ----------------------------*/
// Função para enviar a mensagem para o canal do Telegram
async function enviarMensagemTelegram(mensagem) {
   const token = '6063001127:AAFUIYm7NvEiMo59Q0TzU2t6ZoFmspHn8BY'; //  Token do bot do Telegram
  const chatId = '6042061963'; // ID do canal

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: mensagem
      })
    });

    if (response.ok) {
      alert('Mensagem enviada com sucesso para o Telegram!');
      limparFormulario();
    } else {
      console.error('Erro ao enviar mensagem para o Telegram:', response.status);
    }
  } catch (error) {
    console.error('Erro ao enviar mensagem para o Telegram:', error);
  }
}

// Função para limpar os campos do formulário
function limparFormulario() {
  document.getElementById('nome').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mensagem').value = '';
  document.getElementById('assunto').value = '';
  document.getElementById('telefone').value = '';
}

// Função para lidar com o envio do formulário
function enviarFormulario(event) {
  event.preventDefault(); // Impede o comportamento padrão de envio do formulário

  // Obtém os valores do formulário
  const nome = document.getElementById('nome').value;
  const assunto = document.getElementById('assunto').value;
  const telefone = document.getElementById('telefone').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;

  // Monta a mensagem a ser enviada
  const mensagemTelegram = `Nome: ${nome}\nTelefone: ${telefone}\nAssunto: ${assunto}\nEmail: ${email}\nMensagem: ${mensagem}`;

  // Envia a mensagem para o Telegram
  enviarMensagemTelegram(mensagemTelegram);

  const whattsappUrl = 'https://wa.me/5563992485865';

  const mensagemCod = encodeURIComponent(mensagemTelegram);

  const urlCompleta = `${whattsappUrl}?text=${mensagemCod}`;

  window.open(urlCompleta, '_blank');
}

// Adiciona um listener de evento para o envio do formulário
document.getElementById('formulario').addEventListener('submit', enviarFormulario);