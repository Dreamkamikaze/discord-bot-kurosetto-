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

      db.prepare(declaracion).run(pant.url, interaction.user.id);
      db.prepare(statement).run(pant.url, interaction.user.id);
      await interaction.reply('Pantalon guardado');
    } catch (error) {
      await interaction.reply('Ay chamo');
      console.log(error);
    }
  },
};