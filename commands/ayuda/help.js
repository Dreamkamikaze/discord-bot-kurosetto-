const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


const help = () => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Bienvenido a Kurosetto!')
    .setDescription('El server de Kurosetto no es dificil, solo debes de registrarte en el bot con el `/crear-usuario`, para luego montar tus ropas segun la categoria con el `/montar`: camisa, pantalones, zapatos. Puedes ver tu closet en `/closet`, lo cual te mostarar lo que tienes guardado y borrar vestimenta si no la usas. Pero la parte mas importante de kurosetto es... `/kurosetto`, la cual te permite hacer un oufit aletorio de las cosas que guardes en tu closet. Diviertete!')
    .setImage('https://cdn.discordapp.com/attachments/1166957620347809824/1171468102391836743/ejemplo.PNG?')
    .setFooter({ text: 'Ejemplo de /kurosetto' });

  return exampleEmbed;
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ayuda')
    .setDescription('Explica como usar a kurosetto!'),
  async execute(interaction) {
    const embed = await help();
    await interaction.reply({ embeds: [embed], ephemeral:true });
  },
};