const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);
	
		if (!command)
			return console.error(`Komenda ${interaction.commandName} nie istnieje.`);
	
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'Coś się jebło proszę Państwa.', ephemeral: true });
			} else {
				await interaction.reply({ content: 'Coś się jebło proszę Państwa.', ephemeral: true });
			}
		}
	},
};
