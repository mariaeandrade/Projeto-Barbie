import { setSourceMapsSupport } from "module";
import dados from "../models/dados.js";


const { barbies } = dados;

const getAllBarbies = (req, res) => {
    res.status(200).json({
        total: barbies.length,
        barbies: barbies
    });
}

const getBarbiesById = (req, res) => {
    const id = parseInt(req.params.id)

    const barbie = barbies.find(b => b.id === id);

    res.status(200).json({
        total : barbie.length,
        barbie:barbie
    })
}

const creatBarbie = (req, res) => {
    const { nome, profissao, anoLancamento} = req.body

    if( !nome || !profissao) {
        return res.status(400).json({
            sucess: false,
            message: "Nome e profissão sao obrigatorios para a criação de uma barbie"
        });
    }

    const novaBarbie = {
        id : barbies.length + 1,
        nome: nome,
        profissao: profissao,
        anoLancamento: anoLancamento
    }
    barbies.push(novaBarbie);

    res.status(201).json({
        sucess: true,
        message: "Nova barbie criada com sucesso",
        barbie: novaBarbie
    });
}

const deleteBarbie = (req, res) => {
    const id = parseInt(req.params.id);

    if(isNaN(id)){
        return res.status(400).json ({
            sucess: false,
            message: "O ID deve ser valido"
        })
    }
    const barbiesParaRemover = barbies.find(b => b.id === id); 
    if(!barbiesParaRemover) {
        return res.status(404).json ({
            sucess: false,
            message: `A barbie com ID: ${id} não existe`
        })
    }
    const barbiesFiltradas = barbies.filter(barbie => barbie.id !== id);

    barbies.splice(0, barbies.length, ... barbiesFiltradas);

    res.status(200).json ({
        sucess: true,
        message: `A barbie ${id} foi removida de linha.`
    })
}

export {getAllBarbies, getBarbiesById, creatBarbie, deleteBarbie}