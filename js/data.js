/**
 * Base de dados dos locais de filmagem.
 *
 * Como adicionar um novo local:
 * 1. Copie um dos objetos abaixo e cole no final do array LOCATIONS.
 * 2. Preencha os campos (veja a legenda de cada campo nos comentários).
 * 3. Para achar lat/lng precisos: abra o local no Google Maps, clique com o
 *    botão direito sobre o ponto exato -> clique nas coordenadas que aparecem
 *    no menu (elas são copiadas automaticamente) -> cole aqui como lat, lng.
 * 4. Para o vídeo: coloque o trecho (.mp4) na pasta videos/ e use
 *    videoUrl: "videos/<nome>.mp4" — ele toca dentro do painel. Também
 *    aceita URL do YouTube (com &t=90s) ou link do Google Drive.
 *
 * zone aceita: "recife-antigo", "santo-antonio" ou "boa-vista" — usado no
 * filtro "Localidade" da lista.
 *
 * Dois locais com lat/lng EXATAMENTE iguais são agrupados automaticamente
 * em um único marcador no mapa (com um selo de contagem), em vez de ficarem
 * sobrepostos. É o caso do Cinema São Luiz abaixo, onde dois filmes
 * dividem a mesma referência.
 *
 * Coordenadas obtidas via OpenStreetMap/Nominatim e fontes públicas
 * (Wikipédia, sites oficiais). Ver README.md para o histórico de revisão.
 */

const LOCATIONS = [
  {
    id: "baile-perfumado",
    title: "O Baile Perfumado",
    year: 1996,
    zone: "recife-antigo",
    placeName: "Associação Comercial de Pernambuco",
    address: "Avenida Alfredo Lisboa, Bairro do Recife (próximo ao Marco Zero), Recife - PE",
    lat: -8.062806158597324,
    lng: -34.87154943711513,
    videoUrl: "videos/baile-perfumado.mp4",
    synopsis: "Benjamin Abrahão é um fotógrafo que se aventura pelo sertão para registrar Lampião e seu bando. A obra mistura ficção e história para reconstruir o universo do cangaço.",
    releaseDate: "26 de julho de 1997",
    director: "Paulo Caldas, Lírio Ferreira",
    screenwriter: "Paulo Caldas, Lírio Ferreira, Hilton Lacerda",
    notes: "Prédio histórico da Associação Comercial de Pernambuco, ao lado do Marco Zero, no Bairro do Recife."
  },
  {
    id: "agente-secreto",
    title: "O Agente Secreto",
    year: 2025,
    zone: "boa-vista",
    placeName: "Vista da Ponte Duarte Coelho",
    address: "Ponte Duarte Coelho, Boa Vista, Recife - PE",
    lat: -8.062377428539778,
    lng: -34.8811299999189,
    videoUrl: "videos/agente-secreto.mp4",
    synopsis: "Em 1977, Marcelo retorna ao Recife em meio à ditadura militar e se vê envolvido em uma trama de perseguições e memórias. A cidade ocupa um papel central na construção da narrativa.",
    releaseDate: "6 de novembro de 2025",
    director: "Kleber Mendonça Filho",
    screenwriter: "Kleber Mendonça Filho",
    notes: "Da janela, a cena mostra a Ponte Duarte Coelho sobre o Capibaribe, ligando a Rua da Aurora à Avenida Guararapes."
  },
  {
    id: "febre-do-rato",
    title: "Febre do Rato",
    year: 2011,
    zone: "santo-antonio",
    placeName: "Avenida Dantas Barreto",
    address: "Avenida Dantas Barreto, Santo Antônio, Recife - PE",
    lat: -8.0639,
    lng: -34.8786,
    videoUrl: "videos/febre-do-rato.mp4",
    synopsis: "Zizo é um poeta anarquista que circula pelas ruas do Recife entre poesia, desejo e transgressão. Sua relação com Eneida movimenta uma história marcada pela liberdade e pelo confronto com as convenções.",
    releaseDate: "15 de junho de 2012",
    director: "Cláudio Assis",
    screenwriter: "Hilton Lacerda",
    notes: "Cortejo em cima de carros pelas ruas do centro, na região da Avenida Dantas Barreto, em Santo Antônio."
  },
  {
    id: "filha-do-advogado",
    title: "A Filha do Advogado",
    year: 1926,
    zone: "recife-antigo",
    placeName: "Ponte Maurício de Nassau",
    address: "Ponte Maurício de Nassau, Recife - PE",
    lat: -8.0639,
    lng: -34.8753,
    videoUrl: "videos/filha-do-advogado.mp4",
    synopsis: "Uma jovem se vê envolvida em uma trama de segredos, disputas familiares e conflitos amorosos. A obra também preserva importantes imagens do Recife durante o Ciclo do Recife.",
    releaseDate: "1926",
    director: "Jota Soares",
    screenwriter: "Jota Soares",
    notes: "Um dos primeiros filmes de ficção pernambucanos. A ponte liga o Bairro do Recife a Santo Antônio."
  },
  {
    id: "parahyba-mulher-macho",
    title: "Parahyba Mulher Macho",
    year: 1983,
    zone: "santo-antonio",
    placeName: "Praça da República",
    address: "Praça da República, Santo Antônio, Recife - PE",
    lat: -8.0609,
    lng: -34.8780,
    videoUrl: "videos/parahyba-mulher-macho.mp4",
    synopsis: "Anayde Beiriz é uma jovem professora que não se conforma com as ideias e costumes da sociedade de sua época. Ao se apaixonar por João Dantas, ela acaba se tornando pivô do estopim da Revolução de 1930.",
    releaseDate: "1983",
    director: "Tizuka Yamasaki",
    screenwriter: "Tizuka Yamasaki, José Louzeiro",
    notes: "Praça histórica cercada por prédios públicos, em frente ao Palácio do Campo das Princesas."
  },
  {
    id: "1817-revolucao",
    title: "1817: A Revolução Esquecida",
    year: 2017,
    zone: "santo-antonio",
    placeName: "Palácio do Campo das Princesas",
    address: "Praça da República, s/n - Santo Antônio, Recife - PE",
    lat: -8.0600,
    lng: -34.8774,
    videoUrl: "videos/1817-revolucao.mp4",
    synopsis: "A Revolução Pernambucana de 1817 ganha as telas em uma narrativa que recupera seus personagens, conflitos e acontecimentos. O filme resgata um dos episódios marcantes da história política de Pernambuco.",
    releaseDate: "2017",
    director: "Tizuka Yamasaki",
    screenwriter: "Tizuka Yamasaki",
    notes: "Sede do governo de Pernambuco desde 1841, na Praça da República."
  },
  {
    id: "gonzaga-pai-filho",
    title: "Gonzaga: De Pai pra Filho",
    year: 2012,
    zone: "recife-antigo",
    placeName: "Marco Zero",
    address: "Praça Rio Branco (Marco Zero), Bairro do Recife, Recife - PE",
    lat: -8.063059777412043,
    lng: -34.871258417429424,
    videoUrl: "videos/gonzaga-pai-filho.mp4",
    synopsis: "A relação entre Luiz Gonzaga e Gonzaguinha é o centro da história, marcada por música, conflitos e diferentes formas de enxergar a vida. A narrativa atravessa momentos importantes da trajetória dos dois.",
    releaseDate: "26 de outubro de 2012",
    director: "Breno Silveira",
    screenwriter: "Patricia Andrade, Breno Silveira",
    notes: "Cena de show de Luiz Gonzaga para a multidão no Marco Zero, a Praça Rio Branco, no Bairro do Recife."
  },
  {
    id: "arido-movie",
    title: "Árido Movie",
    year: 2005,
    zone: "recife-antigo",
    placeName: "Porto do Recife",
    address: "Cais do Porto, Bairro do Recife, Recife - PE",
    lat: -8.0513,
    lng: -34.8696,
    videoUrl: "videos/arido-movie.mp4",
    synopsis: "Jonas apresenta previsão do tempo em São Paulo quando a morte do pai o obriga a voltar a Pernambuco, onde a avó espera que ele vingue a família.",
    releaseDate: "14 de abril de 2005",
    director: "Lírio Ferreira",
    screenwriter: "Lírio Ferreira, Hilton Lacerda, Sérgio Oliveira, Eduardo Nunes",
    notes: "Vista aérea do porto, no extremo norte do Bairro do Recife."
  },
  {
    id: "amarelo-manga",
    title: "Amarelo Manga",
    year: 2002,
    zone: "recife-antigo",
    placeName: "Av. Marquês de Olinda e Ponte Maurício de Nassau",
    address: "Avenida Marquês de Olinda, Bairro do Recife, Recife - PE",
    lat: -8.063638718158245,
    lng: -34.873844067008505,
    videoUrl: "videos/amarelo-manga.mp4",
    synopsis: "Histórias cruzadas em torno de um bar e um hotel no Recife revelam um mosaico de personagens à margem, entre desejo e violência.",
    releaseDate: "15 de agosto de 2003",
    director: "Cláudio Assis",
    screenwriter: "Hilton Lacerda",
    notes: "A cena percorre a Avenida Marquês de Olinda e em seguida entra na Ponte Maurício de Nassau, em direção a Santo Antônio."
  },
  {
    id: "lisbela-e-o-prisioneiro",
    title: "Lisbela e o Prisioneiro",
    year: 2003,
    zone: "boa-vista",
    placeName: "Cinema São Luiz",
    address: "Rua da Aurora, 175, Boa Vista, Recife - PE",
    lat: -8.06211,
    lng: -34.88181,
    videoUrl: "videos/lisbela-e-o-prisioneiro.mp4",
    synopsis: "Lisbela sonha com os galãs do cinema quando conhece Leléu, um conquistador perseguido por um matador do seu passado.",
    releaseDate: "22 de agosto de 2003",
    director: "Guel Arraes",
    screenwriter: "Guel Arraes, Pedro Cardoso, Jorge Furtado (baseado na peça de Osman Lins)",
    notes: "O Cinema São Luiz, na Rua da Aurora, é um dos cinemas de rua mais antigos em atividade no Recife — tombado como patrimônio histórico."
  },
  {
    id: "retratos-fantasmas",
    title: "Retratos Fantasmas",
    year: 2023,
    zone: "boa-vista",
    placeName: "Cinema São Luiz",
    address: "Rua da Aurora, 175, Boa Vista, Recife - PE",
    lat: -8.06211,
    lng: -34.88181,
    videoUrl: "videos/retratos-fantasmas.mp4",
    synopsis: "Documentário que revisita os cinemas de rua do centro do Recife e a relação do diretor com a cidade ao longo de décadas.",
    releaseDate: "24 de agosto de 2023",
    director: "Kleber Mendonça Filho",
    screenwriter: "Kleber Mendonça Filho",
    notes: "Representante brasileiro ao Oscar 2024; revisita o Cinema São Luiz entre outras salas históricas do centro do Recife."
  }
];
