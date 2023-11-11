const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('montar-zapatos')
    .setDescription('Guarda tus zapatos')
    .addAttachmentOption(option =>
      option
        .setName('zapato')
        .setDescription('zapatos que quieres usar')
        .setRequired(true)
    )
  ,


  async execute(interaction) {
    try {

      const shoe = interaction.options.getAttachment('zapato');
      const statement = 'INSERT INTO shoes (shoe, user_id) VALUES(?, ?);';
      const declaracion = 'INSERT INTO clothes (cloth, user_id) VALUES(?, ?)';
      const split = shoe.url.split('?');
      const link =  split[0];

      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(link)) {
        await interaction.reply('Zapatos no validos');

      }
      else
      {

        db.prepare(declaracion).run(shoe.url, interaction.user.id);
        db.prepare(statement).run(shoe.url, interaction.user.id);
        await interaction.reply('Zapatos guardados');
      }
    } catch (error) {
      await interaction.reply('Ocurrio un error. Recuerda registrarte en el bot!');
      console.log(error);
    }
  },
};