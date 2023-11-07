const { ButtonBuilder, ButtonStyle, SlashCommandBuilder,ActionRowBuilder } = require('discord.js');
const db = require('../../database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('closet')
    .setDescription('Muestra tu closet!'),
  async execute(interaction) {
    try{
      ////PRUEBA

      let contador = 0;
      const getClothesStatement = `
      SELECT cloth FROM clothes
      WHERE user_id = ?
      `;

      const clothes = db.prepare(getClothesStatement).all(interaction.user.id);
      const ropas = clothes[contador];
      /////

      ///Botones que hacen cosas
      const dlt = new ButtonBuilder()
        .setCustomId('dlt')
        .setLabel('Delete')
        .setStyle(ButtonStyle.Danger);

      const next = new ButtonBuilder()
        .setCustomId('next')
        .setLabel('-->')
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder()
        .addComponents( dlt, next);
      ///
      const response = await interaction.reply({
        content: ropas.cloth,
        components: [row],
        ephemeral: true,
      });
      const collector = response.createMessageComponentCollector();
      collector.on('collect', async i => {
        if (i.customId === 'next') {
          contador += 1;
          console.log(contador);
          let next = clothes[contador];
          return await i.update({ content: next.cloth, components: [row], ephemeral:true });
        }
        else if (i.customId === 'dlt') {
          const borrar = `
          DELETE FROM clothes
          WHERE clothes_id = ?
          `;
          db.prepare(borrar).run(contador);
          return await i.update({ content: 'Ropa borrada', components: [], ephemeral:true });
        }
      });


    } catch (error){
      console.log(error);
    }
  },
};
