        async function RequisitarLivros(){
            let respo = await fetch(`https://adinfinutum.profrodolfo.com.br/livro.php`);
            let res = await respo.json();
            return res;
        }

        async function VerLivro(i){
            i = Number(i);
            let livros = await RequisitarLivros();
            let livro = livros.find(livro => livro.cd == i);
            alert(livro.titulo);
            localStorage.setItem('livro', JSON.stringify(livro));
            location.href = 'livro.html';
        }

        async function ExibirLivros(){
            let res = await RequisitarLivros();
            for(let i = 0; i < res.length; i++){
                    document.getElementById('conteudo').innerHTML+= ` 
                        <div class="productBox">
                            <div class="bookBox">
                                <img src="https://adinfinutum.profrodolfo.com.br/img/capas/${res[i].capa}">
                                <h2>${res[i].titulo}</h2>
                            </div>
                            <div class="down">
                                <div class="btnBox">
                                    <button onclick="VerLivro(${res[i].cd})">Ver Mais</button>
                                </div> 
                            </div>
                        </div>
                    `
                        
                }
            }

        async function PesquisarLivros(){
            document.getElementById('conteudo').innerHTML = '';
            let data = await RequisitarLivros();
            let search = document.querySelector('#search').value.toUpperCase();
            if(search==undefined || search==null){
                ExibirLivros();
            }else{
                for(let i = 0; i < data.length; i++){
                    if(data[i].titulo.toUpperCase().includes(search)){
                        document.getElementById('conteudo').innerHTML+= `
                        <div class="productBox">
                            <div class="bookBox">
                                <img src="https://adinfinutum.profrodolfo.com.br/img/capas/${data[i].capa}">
                                <h2>${data[i].titulo}</h2>
                            </div>
                            <div class="down">
                                <div class="btnBox">
                                    <button onclick="VerLivro(${data[i].cd})">Ver Mais</button>
                                </div> 
                            </div>
                        </div>

                    `    
                    }   
                }
            }   
        }

        ExibirLivros();
        document.querySelector('#search').addEventListener('input', ()=>{
            PesquisarLivros();
        });