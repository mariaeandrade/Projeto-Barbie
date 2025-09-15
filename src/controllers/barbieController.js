import dados from "../models/dados.js";

const { barbies } = dados;

const getAllBarbies = (req, res) => {
  res.status(200).json({
    total: barbies.length,
    barbies: barbies,
  });
};

const getBarbiesById = (req, res) => {
  const id = parseInt(req.params.id);

  const barbie = barbies.find((b) => b.id === id);

  res.status(200).json({
    total: barbie.length,
    barbie: barbie,
  });
};

const creatBarbie = (req, res) => {
  const { nome, profissao, anoLancamento } = req.body;

  if (!nome || !profissao) {
    return res.status(400).json({
      success: false,
      message: "Nome e profissão sao obrigatorios para a criação de uma barbie",
    });
  }

  const novaBarbie = {
    id: barbies.length + 1,
    nome: nome,
    profissao: profissao,
    anoLancamento: anoLancamento,
  };
  barbies.push(novaBarbie);

  res.status(201).json({
    success: true,
    message: "Nova barbie criada com successo",
    barbie: novaBarbie,
  });
};

const deleteBarbie = (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O ID deve ser valido",
    });
  }
  const barbiesParaRemover = barbies.find((b) => b.id === id);
  if (!barbiesParaRemover) {
    return res.status(404).json({
      success: false,
      message: `A barbie com ID: ${id} não existe`,
    });
  }
  const barbiesFiltradas = barbies.filter((barbie) => barbie.id !== id);

  barbies.splice(0, barbies.length, ...barbiesFiltradas);

  res.status(200).json({
    success: true,
    message: `A barbie ${id} foi removida de linha.`,
  });
};

const updateBarbie = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, profissao, anoLancamento } = req.body;

  const idParaEditar = id;

  if (isNaN(idParaEditar)) {
    return res.status(400).json({
      success: false,
      message: "O ID deve ser um número valido.",
    });
  }
  const barbieExiste = barbies.find((barbie) => barbie.id === idParaEditar);
  if (!barbieExiste) {
    return res.status(404).json({
      success: false,
      message: "A Barbie com esse ID para editar não foi encontrada.",
    });
  }

  const barbiesAtualiadas = barbies.map((barbie) =>
    barbie.id === idParaEditar ? {
          ...barbie,
          ...(nome && { nome }),
          ...(profissao && { profissao }),
          ...(anoLancamento && { anoLancamento: parseInt (anoLancamento) }),
        }
      : barbie
  );

  barbies.splice(0, barbies.length, ... barbiesAtualiadas);

  const barbieEditada =  barbies.find((barbie) => barbie.id === idParaEditar);
  res.status(200).json({
    success: true,
    message: "Dados atualizados com successo na barbie",
    barbie: barbieEditada
  })
}

export { getAllBarbies, getBarbiesById, creatBarbie, deleteBarbie, updateBarbie };
