let handler = async (m, { conn, usedPrefix, isOwner }) => {
    m.react('👤')
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:SAPITOBOT;;\nFN:SAPITOBOT\nORG:SAPITOBOT\nTITLE:\nitem1.TEL;waid=51968914403:51968914403\nitem1.X-ABLabel:SAPITOBOT\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:SAPITOBOT\nEND:VCARD`
    await conn.sendMessage(m.chat, { contacts: { displayName: 'SAPITOBOT⁩', contacts: [{ vcard }] } }, { quoted: m })
}
handler.help = ['staff']
handler.tags = ['main']
handler.command = ['owner', 'dueño', 'creador']

export default handler
