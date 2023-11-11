const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('montar-camisa')
    .setDescription('Guarda una camisa')
    .addAttachmentOption(option =>
      option
        .setName('camisa')
        .setDescription('Camisa que quieras usar')
        .setRequired(true)
    )
  ,


  async execute(interaction) {
    try {

      const shirt = interaction.options.getAttachment('camisa');
      console.log(shirt);
      const statement = 'INSERT INTO shirts (shirt, user_id) VALUES(?, ?);';
      const declaracion = 'INSERT INTO clothes (cloth, user_id) VALUES(?, ?)';
      const split = shirt.url.split('?');
      const link =  split[0];

      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(link)) {
        await interaction.reply('Camisa no valida');

      }
      else
      {
        db.prepare(declaracion).run(shirt.url, interaction.user.id);
        db.prepare(statement).run(shirt.url, interaction.user.id);
        await interaction.reply('Camisa guardada');
      }
    } catch (error) {
      await interaction.reply('Ocurrio un error. Recuerda registrarte en el bot!');
      console.log(error);
    }
  },
};