/**
 * Base de dados dos locais de filmagem.
 *
 * Como adicionar um novo local:
 * 1. Copie um dos objetos abaixo e cole no final do array LOCATIONS.
 * 2. Preencha os campos (veja a legenda de cada campo nos comentários).
 * 3. Para achar lat/lng precisos: abra o local no Google Maps, clique com o
 *    botão direito sobre o ponto exato -> clique nas coordenadas que aparecem
 *    no menu (elas são copiadas automaticamente) -> cole aqui como lat, lng.
 * 4. Para o link do vídeo: cole a URL do YouTube (com &t=90s para começar
 *    num tempo específico) ou o link de compartilhamento do Google Drive.
 *
 * island aceita apenas dois valores: "recife-antigo" ou "santo-antonio".
 *
 * Dois locais com lat/lng EXATAMENTE iguais são agrupados automaticamente
 * em um único marcador no mapa (com um selo de contagem), em vez de ficarem
 * sobrepostos. Foi o caso proposital do Marco Zero e do Pátio de São Pedro
 * abaixo, onde não temos o endereço exato de cada cena.
 *
 * Coordenadas obtidas via OpenStreetMap/Nominatim (ago/2026) para os pontos
 * de referência informados. Ver README.md para as fontes e para o histórico
 * de revisão desta lista.
 */

const LOCATIONS = [
  {
    id: "baile-perfumado",
    title: "O Baile Perfumado",
    year: 1996,
    island: "recife-antigo",
    islandLabel: "Ilha do Recife Antigo",
    placeName: "Bairro do Recife (Marco Zero)",
    address: "Bairro do Recife (Recife Antigo), Recife - PE",
    lat: -8.0634,
    lng: -34.8710,
    videoUrl: "",
    notes: "Endereço exato da cena não informado — marcador posicionado no Marco Zero, ponto de referência do Bairro do Recife."
  },
  {
    id: "agente-secreto",
    title: "Agente Secreto",
    year: 2022,
    island: "recife-antigo",
    islandLabel: "Ilha do Recife Antigo",
    placeName: "Bairro do Recife (Marco Zero)",
    address: "Bairro do Recife (Recife Antigo), Recife - PE",
    lat: -8.0634,
    lng: -34.8710,
    videoUrl: "",
    notes: "Endereço exato da cena não informado — marcador posicionado no Marco Zero, ponto de referência do Bairro do Recife."
  },
  {
    id: "febre-do-rato",
    title: "Febre do Rato",
    year: 2011,
    island: "recife-antigo",
    islandLabel: "Ilha do Recife Antigo",
    placeName: "Rua da Moeda",
    address: "Rua da Moeda, Bairro do Recife, Recife - PE",
    lat: -8.0646,
    lng: -34.8731,
    videoUrl: "",
    notes: "Rua histórica de galerias de arte e boemia no Bairro do Recife."
  },
  {
    id: "filha-do-advogado",
    title: "A Filha do Advogado",
    year: 1926,
    island: "recife-antigo",
    islandLabel: "Ilha do Recife Antigo",
    placeName: "Ponte Maurício de Nassau",
    address: "Ponte Maurício de Nassau, Recife - PE",
    lat: -8.0639,
    lng: -34.8753,
    videoUrl: "",
    notes: "Um dos primeiros filmes de ficção pernambucanos. A ponte liga o Bairro do Recife a Santo Antônio."
  },
  {
    id: "paraiba-mulher-macho",
    title: "Paraíba Mulher Macho",
    year: 1983,
    island: "santo-antonio",
    islandLabel: "Ilha de Santo Antônio",
    placeName: "Praça da República",
    address: "Praça da República, Santo Antônio, Recife - PE",
    lat: -8.0609,
    lng: -34.8780,
    videoUrl: "",
    notes: "Praça histórica cercada por prédios públicos, em frente ao Palácio do Campo das Princesas."
  },
  {
    id: "1817-revolucao",
    title: "1817 - A Revolução Esquecida",
    year: 2017,
    island: "santo-antonio",
    islandLabel: "Ilha de Santo Antônio",
    placeName: "Palácio do Campo das Princesas",
    address: "Praça da República, s/n - Santo Antônio, Recife - PE",
    lat: -8.0600,
    lng: -34.8774,
    videoUrl: "",
    notes: "Sede do governo de Pernambuco desde 1841, na Praça da República."
  },
  {
    id: "prometo-que-um-dia",
    title: "Prometo que um dia deixo essa cidade",
    year: 2019,
    island: "santo-antonio",
    islandLabel: "Ilha de Santo Antônio",
    placeName: "Rua Imperador Dom Pedro II",
    address: "Rua Imperador Dom Pedro II, Santo Antônio, Recife - PE",
    lat: -8.0629,
    lng: -34.8770,
    videoUrl: "",
    notes: ""
  },
  {
    id: "gonzaga-pai-filho",
    title: "Gonzaga: De Pai pra Filho",
    year: 2012,
    island: "santo-antonio",
    islandLabel: "Ilha de Santo Antônio",
    placeName: "Pátio de São Pedro",
    address: "Pátio de São Pedro, Santo Antônio, Recife - PE",
    lat: -8.0670,
    lng: -34.8790,
    videoUrl: "",
    notes: "Entorno da Igreja de São Pedro dos Clérigos, com o Teatro Hermilo Borba Filho."
  },
  {
    id: "tatuagem",
    title: "Tatuagem",
    year: 2013,
    island: "santo-antonio",
    islandLabel: "Ilha de Santo Antônio",
    placeName: "Pátio de São Pedro",
    address: "Pátio de São Pedro, Santo Antônio, Recife - PE",
    lat: -8.0670,
    lng: -34.8790,
    videoUrl: "",
    notes: "Cena rodada no Teatro Hermilo Borba Filho, no Pátio de São Pedro."
  }
];
