const mongoose = require("mongoose");
const Joi = require("joi");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required."],
  },
  address: {
    type: String,
    required: [true, "address is required."],
  },
  email: {
    type: String,
    required: [true, "email is required."],
  },
  endereco: String,
  bairro: String,
  cpf: {
    type: String,
    match: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, // Validar formato de CPF
  },
  forma_pagamento: String,
  prescricao: {
    type: String,
    maxlength: 400,
  },
  codigo_armacao: String,
  codigo_lente: String,
  compras: [
    {
      valor_total: Number, // Valor total da compra
      quantidade_parcelas: Number, // Quantidade de parcelas
      parcelas: [
        {
          numero: Number, // Número da parcela (ex: 1, 2, 3...)
          valor: Number, // Valor da parcela
          data_vencimento: Date, // Data de vencimento da parcela
          status: {
            type: String,
            enum: ['pendente', 'pago', 'atrasado'], // Status da parcela
            default: 'pendente', // Inicia como pendente
          },
        },
      ],
    },
  ],
  preco: Number,
  
  phone: {
    type: Number,
    required: [true, "phone number is required."],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Contact = new mongoose.model("Contact", ContactSchema);

const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    address: Joi.string().min(4).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().min(7).max(10000000000).required(),
  });

  return schema.validate(data);
};

module.exports = {
  validateContact,
  Contact,
};








  