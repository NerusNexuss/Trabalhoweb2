window.onload = atualizarListaCasas();
class Imovel {
  constructor(
    preco,
    rua,
    numero,
    bairro,
    cep,
    numeroQuartos,
    banheiros,
    garagem,
    titulo,
    caracteristica
  ) {
    this.preco = preco;
    this.rua = rua;
    this.numero = numero;
    this.bairro = bairro;
    this.cep = cep;
    this.numeroQuartos = numeroQuartos;
    this.banheiros = banheiros;
    this.garagem = garagem;
    this.titulo = titulo;
    this.caracteristica = caracteristica;
  }
}

class Casa extends Imovel {
  constructor(
    endereco,
    titulo,
    caracteristicas,
    preco,
    areaTerreno,
    areaConstruida,
    numero,
    bairro,
    cep,
    numeroQuartos,
    banheiros
  ) {
    super(
      banheiros,
      numeroQuartos,
      preco,
      endereco.rua,
      endereco.numero,
      bairro,
      endereco.cep,
      caracteristicas.numeroQuartos,
      caracteristicas.banheiros,
      caracteristicas.garagem,
      titulo,
      caracteristicas
    );
    this.areaTerreno = areaTerreno;
    this.areaConstruida = areaConstruida;
    this.numero = numero;
    this.bairro = bairro;
    this.cep = cep;
    this.numeroQuartos = numeroQuartos;
    this.banheiros = banheiros;
  }
}

class Apartamento extends Imovel {
  constructor(endereco, titulo, caracteristicas, preco, metragem, condominio) {
    super(
      preco,
      endereco.rua,
      endereco.numero,
      endereco.bairro,
      endereco.cep,
      caracteristicas.numeroQuartos,
      caracteristicas.banheiros,
      caracteristicas.garagem,
      titulo,
      caracteristicas
    );
    this.metragem = metragem;
    this.condominio = condominio;
  }
}
function removerCasa(casa) {
  console.log(typeof casa);
  localStorage.removeItem(casa);
}

function atualizarListaCasas() {
  const casas = JSON.parse(localStorage.getItem("casas")) || [];
  const listaCasas = document.getElementById("listaCasas");
  listaCasas.innerHTML = "";
  const casaStorage = localStorage.getItem("contador");
  console.log(casaStorage);
  for (let i = 1; i <= casaStorage; i++) {
    let casa = JSON.parse(localStorage.getItem(`casa${i}`));
    const casaItem = document.createElement("li");
    console.log(casa[0]);
    casa.forEach((element) => {
      casaItem.innerHTML = `Rua: ${element.rua}, Área do Terreno: ${element.areaTerreno}, Área Construída: ${element.areaConstruida}, preço: ${element.preco}, numero da casa: ${element.numero},
    Bairro:${element.bairro}, Cep:${element.cep}, Numero de quartos:${element.numeroQuartos}, Banheiros: ${element.banheiros} <br><button class="btn btn-primary me-1">Editar</button> <button id="casa${i}" class="btn btn-danger">remover</button>`;
      listaCasas.appendChild(casaItem);
    });
    let remover = document.querySelector(`#casa${i}`);
    console.log(remover);
    remover.addEventListener("click", (element) => {
      console.log();
      removerCasa(element.target.id);
      casaItem.innerHTML = "";
      localStorage.removeItem("contador");
    });
  }
}

function cadastrarCasa() {
  const rua = document.getElementById("rua").value;
  const areaTerreno = document.getElementById("areaTerreno").value;
  const areaConstruida = document.getElementById("areaConstruida").value;
  const preco = document.getElementById("preco").value;
  const numero = document.getElementById("numero").value;
  const bairro = document.getElementById("bairro").value;
  const cep = document.getElementById("cep").value;
  const numeroQuartos = document.getElementById("numeroQuartos").value;
  const banheiros = document.getElementById("banheiro").value;

  if (
    !rua ||
    !areaTerreno ||
    !areaConstruida ||
    !preco ||
    !numero ||
    !bairro ||
    !cep ||
    !numeroQuartos ||
    !banheiros
  ) {
    alert("Por favor, prencha todos os campos.");
    return;
  }

  const endereco = { rua };
  const caracteristicas = { numeroQuartos: 3, banheiros: 2, garagem: 2 };
  const casa = new Casa(
    endereco,
    "Casa",
    caracteristicas,
    preco,
    areaTerreno,
    areaConstruida,
    numero,
    bairro,
    cep,
    numeroQuartos,
    banheiros
  );
  let contador = localStorage.getItem("contador");
  contador = Number(contador);
  const casas = JSON.parse(localStorage.getItem("casas")) || [];
  casas.push(casa);
  if (contador === undefined) {
    localStorage.setItem(contador, 1);
    localStorage.setItem(`casa${contador}`, JSON.stringify(casas));
  } else {
    localStorage.setItem("contador", (contador = contador + 1));
    localStorage.setItem(`casa${contador}`, JSON.stringify(casas));
  }

  atualizarListaCasas();
}

function atualizarListaApartamentos() {
  const apartamentos = JSON.parse(localStorage.getItem("apartamentos")) || [];
  const listaApartamentos = document.getElementById("listaApartamentos");
  listaApartamentos.innerHTML = "";

  apartamentos.forEach((apto) => {
    const aptoItem = document.createElement("li");
    aptoItem.textContent = `Rua: ${apto.rua}, Metragem: ${apto.metragem}, Condomínio: ${apto.condominio}`;
    listaApartamentos.appendChild(aptoItem);
  });
}

function cadastrarApartamento() {
  const ruaApto = document.getElementById("ruaApto").value;
  const metragem = document.getElementById("metragem").value;
  const condominio = document.getElementById("condominio").value;

  if (!ruaApto || !metragem || !condominio) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const enderecoApto = { rua: ruaApto };

  const caracteristicas = { numeroQuartos: 2, banheiros: 1, garagem: 1 };
  const apto = new Apartamento(
    enderecoApto,
    "Apartamento",
    caracteristicas,
    preco,
    metragem,
    condominio
  );

  const apartamentos = JSON.parse(localStorage.getItem("apartamentos")) || [];
  apartamentos.push(apto);
  localStorage.setItem("apartamentos", JSON.stringify(apartamentos));

  atualizarListaApartamentos();
}
