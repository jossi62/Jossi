let handler = async (m, { conn, usedPrefix, isOwner }) => {
m.react('👤')
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:@ꜱɪꜱᴋᴇᴅ - ʟᴏᴄᴀʟ - 𝟢𝟨;;\nFN:@ꜱɪꜱᴋᴇᴅ - ʟᴏᴄᴀʟ - 𝟢𝟨\nORG:@ꜱɪꜱᴋᴇᴅ - ʟᴏᴄᴀʟ - 𝟢𝟨\nTITLE:\nitem1.TEL;waid=584123989549:584123989549\nitem1.X-ABLabel:@ꜱɪꜱᴋᴇᴅ - ʟᴏᴄᴀʟ - 𝟢𝟨\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:@ꜱɪꜱᴋᴇᴅ - ʟᴏᴄᴀʟ - 𝟢𝟨\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'おDanịel.xyz⁩', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['staff']
handler.tags = ['main']
handler.command = ['staff', 'programador', 'sisked'] 

export default handler
