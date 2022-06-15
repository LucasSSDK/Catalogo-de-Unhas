const Unhas = require("../models/Unhas");//trazendo as Unhas que está cadastrado os dados na tabela no meu banco de dados
let message = "";
let type = "";

//getAll - Lista todos
const getAll = async (req, res) => {//async, aguarda porque eu vou lá fazer a consulta espere as ações para renderizar a página
    try{//tente por esse caminho se der certo
        const unhas = await Unhas.findAll();//aguardando
        res.render("index",{
            unhas,
            unhasPut: null,
            unhasDel: null,
            message,
            type,
        });
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
};

//rota para pegar o ID do Unhas selecionado
const getById = async (req,res) => {
    try{
        const unhas = await Unhas.findByPk(req.params.id);//encontrando o Unhas que foi escolhido pelo id, findByPk procurar pela chave primaria que é o id, e esse id vai chegar por parametro
        res.render("detalhes", {
            unhas
        });
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
};

//rota de criação do Unhas
const criar = (req, res ) => {
    try{
        res.render("criar", {message, type});
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
};

const criacao  = async (req,res) =>{
    try{
        const unhas = req.body;//a requisição que vem do body, pegando os dados que vem do body
        if(
            !unhas.nome ||
            !unhas.caracteristicas ||
            !unhas.imagem
        ){
            message = "Preencha todos os campos para cadastro!"
            type = "danger";
            return res.redirect("/criar");
        }
        await Unhas.create(unhas);//model Unhas e cria o Unhas que chegou, async espera essa transação
        res.redirect("/");
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
};

//rota editar Unhas
const editar1 = async (req,res) => {
    const unhas = await Unhas.findByPk(req.params.id);

    if(!unhas){
        res.render("editar", {
            message: "modelo não foi encontrado!",
            type: "danger"
        });
    }
    res.render("editar",{
        unhas,
        message:"Editado com sucesso",
        type: "success"
    });
};

//rota de edição do Unhas
const editar = async (req,res) => {
    try{
        const unhas = await Unhas.findByPk(req.params.id);
        const {nome, caracteristicas, imagem } = req.body;

        unhas.nome = nome;
        unhas.caracteristicas = caracteristicas;
        unhas.imagem = imagem;

        const unhasEditadas = await Unhas.save();
       
        res.redirect("/");
    }catch(err){//deu erro, venha nesse caminho
        res.status(500).send({err: err.message});//vem do objeto erro
    };
};


const deletar = async (req, res) =>{
    try{
       await Unhas.destroy({where:{id: req.params.id}});
       message = "Unha removida com sucesso!"
       res.redirect("/");
   
   
    } catch (err) {
       res.status(500).send({ err: err.message });
     }
   
   
   }

module.exports = {
    getAll,
    getById,
    criar,
    criacao,
    editar1,
    editar,
    deletar,
}