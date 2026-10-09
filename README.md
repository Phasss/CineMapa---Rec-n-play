# Cinemapa do Recife Antigo

Site estático (HTML/CSS/JS puro, sem build) com um mapa interativo das locações
de filmagem pelo Recife — do centro histórico (Bairro do Recife e Santo
Antônio) à zona sul, Ibura e municípios vizinhos.

Cada marcador do mapa abre um painel com:

- Nome do filme, ano e local;
- Endereço/ponto de referência;
- Link (e player embutido, se for YouTube) para o trecho da cena;
- Botão "Como chegar a pé" que abre o Google Maps já com a rota para pedestres.

Feito **mobile-first**: no celular, um botão de menu (☰) no cabeçalho abre a
lista de locais como uma gaveta lateral por cima do mapa, e o painel de
detalhes abre como uma folha (bottom sheet) que sobe da parte de baixo da
tela — pensado para ser usado andando pela rua. Locais com o mesmo ponto de
referência (endereço exato da cena não informado) são agrupados em um único
marcador com selo de contagem, em vez de ficarem sobrepostos no mapa.

## Estrutura

```
index.html        página principal
css/style.css      estilos
js/data.js         base de dados dos locais (edite aqui)
js/app.js          lógica do mapa e da interface
```

## Como adicionar/editar locais

Abra [`js/data.js`](js/data.js) e edite o array `LOCATIONS`. Cada item segue este formato:

```js
{
  id: "identificador-unico",
  title: "Nome do Filme",
  year: 2020,
  placeName: "Nome curto do local",
  address: "Endereço completo, Recife - PE",
  lat: -8.0631,
  lng: -34.8712,
  videoUrl: "https://www.youtube.com/watch?v=XXXXXXXX&t=90s", // ou link do Google Drive
  synopsis: "Sinopse curta do filme.",
  releaseDate: "Data de lançamento (texto livre).",
  director: "Nome do diretor/dos diretores.",
  screenwriter: "Nome do roteirista/dos roteiristas.",
  notes: "Observação opcional sobre a cena/local."
}
```

**Como pegar lat/lng precisos:** abra o local no Google Maps, clique com o botão
direito exatamente sobre o ponto → clique nas coordenadas do menu (são copiadas
automaticamente) → cole em `lat` e `lng`.

**Vídeo:** links do YouTube são exibidos com player embutido automaticamente.
Links do Google Drive (ou qualquer outro) aparecem como botão "Assistir trecho"
que abre em nova aba.

> As coordenadas já cadastradas foram obtidas via OpenStreetMap/Nominatim para
> o ponto de referência de cada filme (rua, praça ou prédio) — não são o
> endereço exato de cada cena, que normalmente não é público. Vale conferir e
> ajustar antes de divulgar o site.

**Agrupamento automático:** se dois locais tiverem `lat`/`lng` **idênticos**,
o mapa junta os dois em um único marcador com selo de contagem (ex.: "2"), e o
popup lista os filmes separadamente. É o que acontece hoje com os dois filmes
sem endereço exato (marcados no Marco Zero) e com os dois filmes no Pátio de
São Pedro. Para você "separar" dois locais de um mesmo grupo, basta cadastrar
coordenadas com uma pequena diferença entre eles.

## Rodar localmente

Não precisa de instalação. Basta abrir `index.html` num servidor local simples,
por exemplo:

```bash
python -m http.server 8000
```

e acessar `http://localhost:8000`. (Abrir o arquivo direto com duplo clique
também funciona na maioria dos navegadores, mas alguns bloqueiam
`fetch`/scripts locais — um servidor simples evita esse problema.)

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie estes arquivos:

   ```bash
   git init
   git add .
   git commit -m "Cinemapa do Recife Antigo"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```

2. No GitHub, vá em **Settings → Pages**.
3. Em "Build and deployment", selecione **Deploy from a branch**, branch
   `main`, pasta `/ (root)`.
4. Salve e aguarde alguns minutos. O site ficará disponível em
   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`.

## Locais já mapeados

O mapa cobre o Recife como um todo, sem distinção por bairro/filtro — do
centro histórico (Bairro do Recife, Santo Antônio, Boa Vista, São José) à
zona sul (Boa Viagem, Setúbal, Ibura) e municípios vizinhos (Piedade, em
Jaboatão dos Guararapes). Todos os locais aparecem juntos na lista e no mapa;
a busca filtra por filme, local ou endereço.

O Cinema São Luiz (Rua da Aurora, 175) fica no bairro de **Boa Vista** —
[confirmado pela Wikipédia](https://pt.wikipedia.org/wiki/Cinema_S%C3%A3o_Luiz).
*Lisbela e o Prisioneiro* e *Retratos Fantasmas* foram rodados no mesmo
cinema e aparecem agrupados num único marcador.

A Ponte Maurício de Nassau liga o Bairro do Recife a Santo Antônio — [confirmado
pela Pesquisa Escolar da Fundaj](https://pesquisaescolar.fundaj.gov.br/pt-br/artigo/ponte-mauricio-de-nassau/)
— e foi mantida do lado do Recife Antigo, por onde a locação (o filme de 1926)
é mais associada.

Coordenadas de Praça da República, Palácio do Campo das Princesas, Pátio de
São Pedro, Rua da Moeda, Rua Imperador Dom Pedro II e Ponte Maurício de Nassau
foram obtidas via [Nominatim/OpenStreetMap](https://nominatim.openstreetmap.org/)
em agosto de 2026. Para *O Baile Perfumado* e *Agente Secreto*, cujo endereço
exato da cena não foi informado, o marcador foi posicionado no Marco Zero,
ponto de referência mais conhecido do Bairro do Recife (os dois filmes
aparecem agrupados no mesmo marcador — veja "Agrupamento automático" acima).
