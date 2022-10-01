var btn = document.getElementById('btn');
var login = document.getElementById('login');
var senha = document.getElementById('senha');

    function Verifica(){
        let user = localStorage.usuario;
        if(user){
            location.href = 'acervo.html';
        }else{
            location.href = 'index.html';
        }
    }
    
    async function Logar(){
            let formData = new FormData();
            formData.append('login', `${login.value}`);
            formData.append('senha', `${senha.value}`);
            let res = await fetch('https://adinfinutum.profrodolfo.com.br/mobile/usuario.php', { body: formData, method: 'POST', mode: 'cors', cache: 'default'});
            let data = await res.json();

            if(data.erro){
                location.href = 'acervo.html';
            }else{
                localStorage.setItem('usuario', JSON.stringify(data.dados));
                location.href = 'acervo.html';
            }
        }

        function Deslogar(){
            removeItem('usuario');
            Verifica();
        }
        document.querySelector('#deslogar').addEventListener('click', ()=>{
          Deslogar();
        });
        btn.addEventListener('click', ()=>{
            Logar();    
        });
