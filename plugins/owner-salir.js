let handler = async (m, { conn, text, command }) => {
    let id = text ? text : m.chat
    let pp = 'https://qu.ax/YgShJ.mp4'
    await conn.sendMessage(m.chat, { video: { url: pp }, gifPlayback: true, caption: '𝙰𝚍𝚒𝚘𝚜 𝚊 𝚝𝚘𝚍𝚘𝚜, 𝚎𝚕 𝙱𝚘𝚝 𝚜𝚎 𝚍𝚎𝚜𝚙𝚒𝚍𝚎! KILL BOT', mentions: [m.sender] }, { quoted: m })
    await conn.groupLeave(id)
}
handler.help = ['salir']
handler.tags = ['owner']
handler.command = /^(salir|out|leavegc|leave|salirdelgrupo)$/i
handler.group = true
handler.rowner = true

export default handler
