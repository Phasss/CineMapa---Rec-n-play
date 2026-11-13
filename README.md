# Cinemapa do Recife Antigo

Site estático (HTML/CSS/JS puro, sem build) com um mapa interativo das locações
de filmagem do roteiro "Recife coisa de cinema" (Bairro do Recife e Santo
Antônio), com o trecho de cada cena tocando dentro do próprio painel.

Cada marcador do mapa abre um painel com:

- Nome do filme, ano e local;
- Endereço/ponto de referência;
- Player com o trecho da cena (vídeo em `videos/`, ou YouTube embutido);
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
videos/            trechos das cenas (.mp4 otimizados, 720p)
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
  zone: "recife-antigo", // "recife-antigo", "santo-antonio", "boa-vista" ou "torre" (filtro Localidade)
  videoUrl: "videos/identificador-unico.mp4", // ou URL do YouTube/Google Drive
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

**Vídeo:** arquivos `.mp4` da pasta `videos/` tocam direto no painel. Os
originais em alta resolução ficam em `Cortes dos Filmes/` (fora do git); para
gerar a versão leve usada no site:

```bash
ffmpeg -i "Cortes dos Filmes/Filme/cena.mp4" -vf "scale=-2:'min(720,ih)'" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -c:a aac -b:a 112k -movflags +faststart videos/identificador-unico.mp4
```

Links do YouTube são exibidos com player embutido automaticamente.
Links do Google Drive (ou qualquer outro) aparecem como botão "Assistir trecho"
que abre em nova aba.

> As coordenadas já cadastradas foram obtidas via OpenStreetMap/Nominatim para
> o ponto de referência de cada filme (rua, praça ou prédio) — não são o
> endereço exato de cada cena, que normalmente não é público. Vale conferir e
> ajustar antes de divulgar o site.

**Agrupamento automático:** se dois locais tiverem `lat`/`lng` **idênticos**,
o mapa junta os dois em um único marcador com selo de contagem (ex.: "2"), e o
popup lista os filmes separadamente. É o que acontece hoje com os dois filmes no
Pátio de São Pedro. Para você "separar" dois locais de um mesmo grupo, basta cadastrar
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

Roteiro "Recife coisa de cinema" (saída do CAT Cenográfico, Praça do Arsenal):

| Filme | Ano | Local | Bairro | Trecho |
|---|---|---|---|---|
| O Baile Perfumado | 1996 | Edifício Chanteclair | Recife Antigo | ✔ |
| O Agente Secreto | 2025 | Cinema São Luiz (Rua da Aurora) | Boa Vista | ✔ |
| Febre do Rato | 2011 | Rua da Moeda | Recife Antigo | ✔ |
| A Filha do Advogado | 1926 | Ponte Maurício de Nassau | Recife Antigo | ✔ |
| Árido Movie | 2005 | Porto do Recife | Recife Antigo | ✔ |
| Parahyba Mulher Macho | 1983 | Praça da República | Santo Antônio | ✔ |
| 1817: A Revolução Esquecida | 2017 | Palácio do Campo das Princesas | Santo Antônio | ✔ |
| Prometo que um dia deixo essa cidade | 2019 | Rua Imperador Dom Pedro II | Santo Antônio | — |
| Gonzaga: De Pai pra Filho | 2012 | Pátio de São Pedro | Santo Antônio | — |
| Tatuagem | 2013 | Pátio de São Pedro | Santo Antônio | — |
| As Três Marias | 2002 | Igreja de Nossa Senhora do Rosário | Torre | ✔ |

Coordenadas obtidas via [Nominatim/OpenStreetMap](https://nominatim.openstreetmap.org/).
*Gonzaga* e *Tatuagem* dividem o marcador do Pátio de São Pedro (veja
"Agrupamento automático" acima).
