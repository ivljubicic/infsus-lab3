interface Vrtlar {
    vrtlarID: number;
    ime: string;
    mailadresa: string;
  }
  
interface InventarnaStavka {
    stavkaID: number;
    lokacija: string;
    naziv: string;
    rokTrajanja: Date | null;
    kolicina: number;
    vrtlarID: number | null;
  }
  
interface Izracun {
    izracunID: number;
    statusVremenskePrognoze: string;
    odluka: number;
    vrtlarID: number | null;
  }
  
interface Biljka {
    biljkaid: number;
    naziv: string;
    osuncanje: number;
    phtla: number;
    vlaznost: number;
    vrijemebranja: Date;
    vrijemesadnje: Date;
    vrtlarid: number | null;
  }
  
interface Lokacija {
    id: number;
    ime: string;
}

interface Senzor {
    senzorID: number;
    tipSenzora: string;
    ocitanje: number;
    datumOcitanja: Date;
    izracunID: number | null;
  }
  
interface SustavZaNavodnjavanje {
    sustavID: number;
    zadnjeUkljucenje: Date;
    status: string;
    izracunID: number | null;
  }
  
interface Gredica {
    gredicaid: number;
    duljina: number;
    sirina: number;
    lokacijaid: number;
    naziv: string;
    vrtlarID: number | null;
    senzorID: number | null;
    sustavID: number | null;
  }

  interface Posadena {
    gredicaid: number;
    biljkaid: number;
    kolicina: number;
    vrijemesadnje: Date;
  }
  
  export type { Vrtlar, InventarnaStavka, Izracun, Biljka, Senzor, SustavZaNavodnjavanje, Gredica, Lokacija, Posadena };
  