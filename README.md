# AJuDE: AquiJUntosDoandoEsperanca
### Universidade Federal de Campina Grande
### Frontend Projeto de Software 2019.2

## O Projeto
O AJuDE é uma ferramenta que permite a organização de doações para projetos/campanhas.
<br>
O AJuDE é uma plataforma para financiamento coletivo onde as causas mais populares ganham mais visibilidade. Cada projeto (ou campanha) será atendido quando conseguir arrecadar uma quantidade de doações igual ou superior à meta. O sistema permite que usuários classifiquem os projetos e escrevam comentários sobre os mesmos. Os usuários da aplicação criam projetos com suas metas. A partir desse momento o sistema começa a arrecadação e permite classificar, dar like/dislike nos projetos e ainda escrever comentários sobre eles.


## Deploy atual [aqui](https://ajudefront.herokuapp.com/index.html).


![AjudeProject](https://i.imgur.com/TR683cb.png)


## Estrutura

  * **/icons:** Diretório que armazena os ícones utlizados no projeto; <br>
  * **index.html** - Arquivo contendo a página do projeto (Foi utilizado a arquitetura sigle page e multi viewes);
  * **/scripts** - Diretório contendo todos os arquivos referentes aos scripts do projeto;
      * **/scripts/app.js** - Aquivo principal, contendo todos os métodos de fecth do sistema, além de funções auxiliares de visualização de dados. Também contém a função init (a função que se auto invoca);
      * **/scripts/campanha.js** - Arquivo contento todas as informações de exibição de campanha, com comentários likes e respostas a comentários;
      * **/scripts/dados.js** - Arquivo contendo os fetchs que recupera todos os usuários e campanhas já cadastrados no sistem, armazenado em arrays para, futuramente, acontecer o redirecionamento pela URL;
      * **/scripts/listagemCampanhas.js** - Arquivo contendo as funções de listagem da página inicial do sistema (Top 5, de acordo com o tipo de relevância);
      * **/scripts/paginaUsuario.js** - Arquivo responsável por organizar os dados do perfil de usuário e exibi-los;
      * **/scripts/util.js** - Arquivo contendo funções úteis no projeto. Como, por exxemplo, verificação e validação de email e senha, verificação de token exiprado, criação de URL;
      * **/scripts/viewes.js** - Arquivo armazenando as funções de redirecionamento, organizando quais informações serão exibidas na página inicial;
  * **/style** - Diretório contendo o arquivo css, responsável pela estilização da página;
      * **/style/estilo.css** - Arquivo contendo todas as proporções, cores e animações de todos os elementos do app.


## Tecnologias utilizadas

* **CSS:**
    * Pequeno conjunto de modulos CSS que foi utilizado na parte grafica da aplicação, para estilização e animaçao.
* **JavaScript:**
    * A API Fetch foi utilizada para fazer requests ao back-end e estruturar todas as funcionalidades do sistema.
* **HTML:**
    * Linguagem de marcação de hipertext, elaborando toda a estrutura do sistema. 


<br>Especificação sobre o projeto [aqui](https://docs.google.com/document/d/1h5WhnOhvyRmIbj_obhWK5XmoJgK35lVWPM2UwwMOT_Y/preview#).
* [Parte Backend aqui](https://github.com/ManoMax/backend_AJuDE).
* Orientação por: [@daltonserey](https://github.com/daltonserey), [@raquelvl](https://github.com/raquelvl) e [@juliafealves](https://github.com/juliafealves).


<p><i>
  
  Author: [@EuclidesRamos](https://github.com/EuclidesRamos/)
  <br>Co-author: [@ManoMax](https://github.com/ManoMax)

</i></p>
