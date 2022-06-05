require("dotenv").config;
let message = "";
const express = require("express");
const req = require("express/lib/request");
const path = require("path");
//Utilizando biblioteca "path" do express para acessar index.js e style.css

const app = express();
//Variável que está recebendo o express

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
//Fala para o servidor que a view engine (motor que vai renderizar) é o ejs.

app.use(express.static(path.join(__dirname, "public")));
//Arquivos estáticos (index.js e style.css).

app.use(express.urlencoded());
//Cliente envia info do input através de JSON. e URLENCODED recebe

const motos = [
  //Criando os objetos da pokedex
  {
    id: 1,
    nome: "Daytona 675 2014",
    descricao:
      "Super moto para um super piloto",
    tipo: "50.000",
    
    imagem: "https://autos.culturamix.com/blog/wp-content/gallery/motos-2/moto-2.jpg",
  },

  {
    id: 2,
    nome: "Rockt 3R 2020",
    descricao:
      "A primeira 2500cc do mundo!",
    tipo: "80.000",
     
    imagem: "https://i0.wp.com/motoadventure.com.br/wp-content/uploads/2020/10/Triumph-motorcycles-rocket-3-r-III-lancamento-2021-renovacao-6.jpg?ssl=1",
  },

  {
    id: 3,
    nome: "Fan 125 2014",
    descricao:
      "Para usar no dia a dia",
    tipo: "20.000",
       
    imagem: "https://quatrorodas.abril.com.br/wp-content/uploads/2019/02/screen-shot-2019-02-01-at-12.45.00-pm.png?w=1024&resize=1200,800",
  },
  
];

let moto = undefined;

//Rotas
//Read do CRUD
app.get("/", (req, res) => {
  //Acessando a rota "/"
  setTimeout(() => {
    message = "";
  }, 1000);
  res.render("index", { motos: motos, moto: moto, message });
  // Já temos a renderização configurada e estamos enviando a nossa const "motos" como JSON.
});

//Create do CRUD
app.post("/create", (req, res) => {
  const moto = req.body;
  moto.id = motos.length + 1;
  motos.push(moto);
  message = `Motocicleta cadastrada com sucesso!`;
  res.redirect("/#cards"); //Recarrega a página
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  moto = motos.find((moto) => moto.id === id);
  res.redirect("/#cadastro");
});

//Update do CRUD
app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const newMoto = req.body;
  newMoto.id = id + 1;
  motos[id] = newMoto;
  moto = undefined;
  message = `Motocicleta editada com sucesso!`;
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;

  delete motos[id];
  message = `Motocicleta deletada com sucesso!`;
  res.redirect("/#cards");
});

app.listen(port, () =>
  // Porta em que o servidor está rodando
  console.log(`${port}`)
);
