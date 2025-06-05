let handler = async (m, { conn, usedPrefix, isOwner }) => {
    m.react('👤')
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:JOSSIBOT;;\nFN:JOSSIBOT\nORG:JOSSIBOT\nTITLE:\nitem1.TEL;waid=50764880277:50764880277\nitem1.X-ABLabel:JOSSIBOT\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:JOSSIBOT\nEND:VCARD`
    await conn.sendMessage(m.chat, { contacts: { displayName: 'JOSSIBOT⁩', contacts: [{ vcard }] } }, { quoted: m })
}
handler.help = ['staff']
handler.tags = ['main']
handler.command = ['owner', 'dueño', 'creador']

export default handler
