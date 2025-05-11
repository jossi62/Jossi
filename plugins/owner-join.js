let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})( [0-9]{1,3})?/i

let handler = async (m, { conn, text, isOwner, usedPrefix, command }) => {
    if (!text) return m.reply(`🚩 *¡Invocación fallida!*\nPara unirte a un grupo, *¡entra el enlace de la puerta a otro reino!*`);

    try {
        let [_, code] = text.match(linkRegex) || [];
        if (!code) return m.reply('⚠️ *¡El enlace no tiene poder!* Parece que el enlace es inválido, ¿estás seguro de que es correcto?');

        await conn.groupAcceptInvite(code);
        m.reply(`🖤 *La invocación ha sido exitosa...* Te has unido al grupo como un *Shadow Hunter* con éxito. ¡Prepárate para las batallas! 🖤`);
    } catch {
        return m.reply('💥 *Error en el intento de invocar el grupo...* Algo salió mal, intenta nuevamente.');
    }
}

handler.help = ['join <link>']
handler.tags = ['owner']
handler.command = ['join', 'entrar']
handler.rowner = true

export default handler;