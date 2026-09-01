# Giro Certo Veículos

Esse projeto é o site de uma concessionária fictícia de carros populares e usados, criado
como exemplo. Ele tem quatro páginas início, estoque, sobre e contato todas puxando o
mesmo arquivo de estilo, então dá para abrir qualquer uma delas direto no navegador.

O que tem em cada arquivo
A pasta do projeto é bem simples:
- index.html
Página inicial, com destaque, carros em destaque e depoimentos
- estoque.html
Lista dos 15 carros do pátio, com filtro por categoria
## - Sobre.html
História da concessionária, valores e a equipe

- contato.html

Endereço, horários e um formulário de contato

- style.css
todo o visual do site, compartilhado pelas quatro páginas

A ideia visual por trás do site
A referência foi o clima de pátio de loja de revenda de carros: etiqueta de preço colada
meio torta no para-brisa, faixas de pista separando as fileiras do estoque, aquele tom mais
simples e mais amigavel do que de concessionária de luxo. Por isso a paleta de cores
puxa para o bege de papel, verde e mostarda, com o vermelho-tijolo reservado para os
preços.
Todas essas cores ficam guardadas como variáveis no topo do style.css, dentro de um
bloco chamado :root. Isso significa que, se um dia quiser trocar a cor de marca do site
inteiro, basta mudar o valor em um único lugar o resto do arquivo já usa essa variável,
então tudo se atualiza sozinho.
Para a tipografia, os títulos usam a fonte Fraunces, que tem aquele traço mais desenhado




e dá personalidade para a logo e para os títulos das seções. O corpo do texto, os botões e
o menu usam a Archivo, uma fonte mais neutra e fácil de ler em blocos maiores de texto.
As duas vêm do Google Fonts.

Como o menu e o filtro do estoque funcionam
No celular, o menu vira um ícone de sanduíche que abre a navegação ao ser tocado. E na
página de estoque, dá pra filtrar os carros por categoria Hatch, Sedã, SUV ou Picape
clicando nos botões de cima da lista, que mostrariam o carro de suas respetivas
categorias.

O que é só ilustrativo
Como é um projeto fictício, alguns pontos existem só para dar o clima de real, mas não
fazem nada de fato: o formulário de contato não envia mensagem para ninguém, e o
bloco do mapa é só uma ilustração, não um mapa de verdade carregado ali.

Se quiser mexer
- Para trocar o nome da concessionária, é só procurar por "Giro Certo" nos arquivos .html.
- Para adicionar ou tirar um carro do estoque, é só copiar um dos blocos de carro em
estoque.html e trocar o texto, a categoria e o desenho do ícone.
- Para mudar as cores ou fontes do site inteiro, é só editar as variáveis lá no topo do
style.css.
