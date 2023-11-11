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
      const getIdStatment = `
      SELECT clothes_id FROM clothes
      WHERE user_id = ?
      `;

      const clothes = db.prepare(getClothesStatement).all(interaction.user.id);
      let ropas = clothes[contador];
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
          let next = clothes[contador];
          if (contador >= clothes.length) {
            return await i.update({ content: 'Ya no hay mas ropa', components: [], ephemeral:true });
          }
          return await i.update({ content: next.cloth, components: [row], ephemeral:true });
        }
        else if (i.customId === 'dlt') {

          const id = db.prepare(getIdStatment).all(interaction.user.id);
          let pruebaId= id[contador];

          const borrar = `
          DELETE FROM clothes WHERE clothes_id  = ?
          `;
          db.prepare(borrar).run(pruebaId.clothes_id);
          const borrarCamisas = `
          DELETE FROM shirts WHERE shirt = ?
          `;
          db.prepare(borrarCamisas).run(ropas.cloth);
          const borrarPantalones = `
          DELETE FROM pants WHERE pant = ?
          `;
          db.prepare(borrarPantalones).run(ropas.cloth);
          const borrarZapatos = `
          DELETE FROM shoes WHERE shoe = ?
          `;
          db.prepare(borrarZapatos).run(ropas.cloth);


          return await i.update({ content: 'Ropa borrada', components: [], ephemeral:true });
        }
      });


    } catch (error){
      console.log(error);
      await interaction.reply('No hay ropa en el closet');
    }
  },
};
