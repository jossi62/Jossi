let handler = async (m, { conn, usedPrefix, isOwner }) => {
    m.react('👤')
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:KILL BOT;;\nFN:KILL BOT\nORG:KILL BOT\nTITLE:\nitem1.TEL;waid=56983073328:56983073328\nitem1.X-ABLabel:KILL BOT\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:KILL BOT\nEND:VCARD`
    await conn.sendMessage(m.chat, { contacts: { displayName: '@bykillzn⁩', contacts: [{ vcard }] } }, { quoted: m })
}
handler.help = ['staff']
handler.tags = ['main']
handler.command = ['owner', 'dueño', 'creador']

export default handler
