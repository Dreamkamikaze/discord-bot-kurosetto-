const { SlashCommandBuilder } = require('discord.js');
const db = require('../../database');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('montar-pantalones')
    .setDescription('Guarda un pantalon')
    .addAttachmentOption(option =>
      option
        .setName('pantalon')
        .setDescription('pantalon que quieras usar')
        .setRequired(true)
    )
  ,


  async execute(interaction) {
    try {

      const pant = interaction.options.getAttachment('pantalon');
      const statement = 'INSERT INTO pants (pant, user_id) VALUES(?, ?);';
      const declaracion = 'INSERT INTO clothes (cloth, user_id) VALUES(?, ?)';
      const split = pant.url.split('?');
      const link =  split[0];

      let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

      if (!allowedExtensions.exec(link)) {
        await interaction.reply('Pantalon no valido');

      }
      else
      {

        db.prepare(declaracion).run(link, interaction.user.id);
        db.prepare(statement).run(link, interaction.user.id);
        await interaction.reply('Pantalon guardado');
      }
    } catch (error) {
      await interaction.reply('Ocurrio un error. Recuerda registrarte en el bot!');
      console.log(error);
    }
  },
};