const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const db = require('../../database');


const kurosetto = async({ camisa, pantalones, zapatos }) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Puedes probarte...')
    .setImage(camisa.shirt)
    .setThumbnail(pantalones.pant)
    .setAuthor({ name: 'Y estos zapatos', iconURL: zapatos.shoe, url: zapatos.shoe });

  return exampleEmbed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kurosetto')
    .setDescription('Te muestra un oufit aleatorio!'),
  async execute(interaction) {
    try {
      const getShirtsStatement = `
        SELECT shirt FROM shirts
        WHERE user_id = ?
        `;
      const getPantsStatement = `
        SELECT pant FROM pants
        WHERE user_id = ?
        `;
      const getShoesStatement = `
        SELECT shoe FROM shoes
        WHERE user_id = ?
        `;

      const shirts = db.prepare(getShirtsStatement).all(interaction.user.id);
      let random1 = Math.floor(Math.random()*shirts.length);
      const pants = db.prepare(getPantsStatement).all(interaction.user.id);
      let random2 = Math.floor(Math.random()*pants.length);
      const shoes = db.prepare(getShoesStatement).all(interaction.user.id);
      let random3 = Math.floor(Math.random()*shoes.length);

      ///Esta parte la puedotransformar en funcion//

      const camisa = shirts[random1];
      const pantalones = pants[random2];
      const zapatos = shoes[random3];


      const embed = await kurosetto({ camisa, pantalones, zapatos });
      await interaction.reply({ embeds: [embed], ephemeral:true });

    } catch (error){
      console.log(error);
      await interaction.reply('No se han encontrado una o mas ropas');
    }
  },
};