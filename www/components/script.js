var btn = document.getElementById('btn');
var login = document.getElementById('login');
var senha = document.getElementById('senha');

function alertDismissed() {
    // do something
}


function Verifica(){
    if(localStorage.usuario){
        location.href = 'acervo.html';
    }
}
    
async function Logar(){
        let formData = new FormData();
        formData.append('login', `${login.value}`);
        formData.append('senha', `${senha.value}`);
        let res = await fetch('https://adinfinutum.profrodolfo.com.br/mobile/usuario.php', { body: formData, method: 'POST', mode: 'cors', cache: 'default'});
        let data = await res.json();

        if(data.erro){
            navigator.notification.alert(
                'Senha e/ou email incorretos!',  // message
                alertDismissed,         // callback
                'Falha no login.', // title
                'OK'                  // buttonName
            );
            location.href = 'index.html';
        }else{
            localStorage.setItem('usuario', JSON.stringify(data.dados));
            navigator.notification.alert(
                'Logado com sucesso!',  // message
                alertDismissed,         // callback
                'Login feito com êxito.', // title
                'OK'                  // buttonName
            );
            location.href = 'acervo.html';
        }
}

function Deslogar(){
    removeItem('usuario');
    Verifica();
}


btn.addEventListener('click', ()=>{
    Logar();
});

Verifica();

