export interface UnitInfo {
  id: string;
  name: string;
  address: string;
  formUrl: string;
  latitude?: number;
  longitude?: number;
  distance?: number;
}

export const unitsData: UnitInfo[] = [
  { 
    id: 'santos', 
    name: 'Alameda Santos', 
    address: 'Alameda Santos, 647 - Jardim Paulista, 01419-001', 
    formUrl: 'https://share.hsforms.com/2woP3OkXaSUW5K521je16nAe4grb', 
    latitude: -23.566750, 
    longitude: -46.664390 
  },
  { 
    id: 'amauri1', 
    name: 'Amauri I', 
    address: 'Rua Amauri, 116 - Jardim Europa, 01406-902', 
    formUrl: 'https://share.hsforms.com/2DZ_BT3_QSV6tQHg4fjC87Qe4grb', 
    latitude: -23.576000, 
    longitude: -46.671000 
  },
  { 
    id: 'amauri2', 
    name: 'Amauri II', 
    address: 'Rua Amauri, 227 - Jardim Europa, 01407-200', 
    formUrl: 'https://share.hsforms.com/2vNuBDKfUSIaSGWiB2B9sbwe4grb'
    // Latitude/Longitude pendente
  },
  { 
    id: 'avNoveDeJulho', 
    name: 'Av. Nove de Julho', 
    address: 'Avenida Nove de Julho, 5955 - Jardins, 01407-200', 
    formUrl: 'https://share.hsforms.com/2DZ_BT3_QSV6tQHg4fjC87Qe4grb', 
    latitude: -23.579000, 
    longitude: -46.666000 
  },
  { 
    id: 'campus', 
    name: 'Campus', 
    address: 'Rua Doutor Renato Paes de Barros, 618 - Itaim Bibi, 04530-000', 
    formUrl: 'https://share.hsforms.com/2IPszyYV6QuaAOu4A4uJFKAe4grb', 
    latitude: -23.584071, 
    longitude: -46.673598 
  },
  { 
    id: 'campus2', 
    name: 'Campus II', 
    address: 'Rua Doutor Renato Paes de Barros, 33 - Itaim Bibi, 04530-904', 
    formUrl: 'https://share.hsforms.com/2DZ_BT3_QSV6tQHg4fjC87Qe4grb', 
    latitude: -23.578825, 
    longitude: -46.674980 
  },
  { 
    id: 'consolacao', 
    name: 'Consolação', 
    address: 'Avenida Paulista, 2.202 - Bela Vista, 01310-932', 
    formUrl: 'https://share.hsforms.com/2zhbaq6rFTZyXdG8Q7aLMEge4grb', 
    latitude: -23.557332, 
    longitude: -46.660392 
  },
  { 
    id: 'funchal1', 
    name: 'Funchal I', 
    address: 'Rua Funchal, 203 - Vila Olímpia, 04551-904', 
    formUrl: 'https://share.hsforms.com/2DZ_BT3_QSV6tQHg4fjC87Qe4grb', 
    latitude: -23.593159, 
    longitude: -46.688547 
  },
  { 
    id: 'funchal2', 
    name: 'Funchal II', 
    address: 'Rua Funchal, 538 - Itaim Bibi, 04551-060', 
    formUrl: 'https://share.hsforms.com/2_MOMR__sREGD3AJxVbGeFQe4grb', 
    latitude: -23.593970, 
    longitude: -46.689578 
  },
  { 
    id: 'itaim', 
    name: 'Itaim', 
    address: 'Rua André Fernandes, 205A - Itaim Bibi, 04536-020', 
    formUrl: 'https://share.hsforms.com/2DZ_BT3_QSV6tQHg4fjC87Qe4grb', 
    latitude: -23.581574, 
    longitude: -46.678000 
  },
  { 
    id: 'ministro', 
    name: 'Ministro', 
    address: 'Alameda Ministro Rocha Azevedo, 912 - Cerqueira César, 01410-002', 
    formUrl: 'https://share.hsforms.com/2XzOImLAGQAqEYQg9ctm8jge4grb', 
    latitude: -23.561000, 
    longitude: -46.660000 
  },
  { 
    id: 'paulista302', 
    name: 'Paulista 302', 
    address: 'Avenida Paulista, 302 - Bela Vista, 01310-000', 
    formUrl: 'https://share.hsforms.com/2U5wutuhySQS2FyAUKdvkfwe4grb', 
    latitude: -23.569454, 
    longitude: -46.646452 
  },
  { 
    id: 'paulista475', 
    name: 'Paulista 475', 
    address: 'Avenida Paulista, 475 - Bela Vista, 01311-000', 
    formUrl: 'https://share.hsforms.com/2E9yx7Oe3SeS4a6ZJgu5csge4grb', 
    latitude: -23.566000, 
    longitude: -46.650000 
  },
  { 
    id: 'paulista807', 
    name: 'Paulista 807', 
    address: 'Avenida Paulista, 807 - Bela Vista, 01311-100', 
    formUrl: 'https://share.hsforms.com/2DZ_BT3_QSV6tQHg4fjC87Qe4grb', 
    latitude: -23.561000, 
    longitude: -46.660000
  },
  { 
    id: 'pinheiros1', 
    name: 'Pinheiros I', 
    address: 'Rua Eugênio de Medeiros, 242 - Pinheiros, 05425-000', 
    formUrl: 'https://share.hsforms.com/2DZ_BT3_QSV6tQHg4fjC87Qe4grb', 
    latitude: -23.569243, 
    longitude: -46.700169 
  },
  { 
    id: 'pinheiros', 
    name: 'Pinheiros', 
    address: 'Rua dos Pinheiros, 498 - Pinheiros, 05422-902', 
    formUrl: 'https://share.hsforms.com/23AkXRiU8Ti-ioJ-Z4Ew7QAe4grb', 
    latitude: -23.566000, 
    longitude: -46.684000 
  },
  { 
    id: 'butanta', 
    name: 'Butanta', 
    address: 'R. Butantã, 468 - Pinheiros, 05424-000', 
    formUrl: 'https://share.hsforms.com/2dNNp40veRCWXP9HSV2zuqAe4grb', 
    latitude: -23.567000, 
    longitude: -46.684000 
  },
  { 
    id: 'joaquimantunes', 
    name: 'Joaquim Antunes', 
    address: 'Rua Joaquim Antunes, 450 - Pinheiros, 05415-001', 
    formUrl: 'https://share.hsforms.com/2LTF6OnXhSUaxFtbK292d0Ae4grb', 
    latitude: -23.567000, 
    longitude: -46.684000 
  }
]; 