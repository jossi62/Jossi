let partidasVS4 = {};
let handler = async (m, { conn, args }) => {
  let plantilla = `
𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                            •
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: ${args[0] || ''}
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

      𝗘𝗦𝗖𝗨𝗔𝐃𝐑𝐀 1
    
    👑 ┇  
    🥷🏻 ┇  
    🥷🏻 ┇ 
    🥷🏻 ┇  
    
    ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
    🥷🏻 ┇ 
    🥷🏻 ┇

(𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 ❤️ 𝚙𝚊𝚛𝚊 𝚞𝚗𝚒𝚛𝚝𝚎)
  `.trim()

  let msg = await conn.sendMessage(m.chat, { text: plantilla }, { quoted: m })
  partidasVS4[msg.key.id] = {
    chat: m.chat,
    jugadores: [],
    suplentes: [],
    originalMsg: msg,
  }
}

handler.help = ['4vs4']
handler.tags = ['freefire']
handler.command = /^(vs4|4vs4|masc4)$/i
handler.group = true
handler.admin = true

export default handler;

conn.ev.on('messages.upsert', async ({ messages }) => {
  let m = messages[0]
  if (!m?.message?.reactionMessage) return

  let reaction = m.message.reactionMessage
  let key = reaction.key
  let emoji = reaction.text
  let sender = m.key.participant || m.key.remoteJid


  if (!['❤️', '👍🏻'].includes(emoji)) return
  if (!partidasVS4[key.id]) return

  let data = partidasVS4[key.id]

  if (data.jugadores.includes(sender) || data.suplentes.includes(sender)) return
  if (data.jugadores.length < 4) {
    data.jugadores.push(sender)
  } else if (data.suplentes.length < 2) {
    data.suplentes.push(sender)
  } else return

  let jugadores = data.jugadores.map(u => `@${u.split('@')[0]}`)
  let suplentes = data.suplentes.map(u => `@${u.split('@')[0]}`)

  let plantilla = `
    𝟒 𝐕𝐄𝐑𝐒𝐔𝐒 𝟒

    ⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                                •
    🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
    🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

    ➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 
    ➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

          𝗘𝗦𝗖𝗨𝗔𝐃𝐑𝐀 1
        
      👑 ┇ ${jugadores[0] || ''}
      🥷🏻 ┇ ${jugadores[1] || ''}
      🥷🏻 ┇ ${jugadores[2] || ''}
      🥷🏻 ┇ ${jugadores[3] || ''}
        
        ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
        🥷🏻 ┇ ${suplentes[0] || ''}
        🥷🏻 ┇ ${suplentes[1] || ''}

  (𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 ❤️ 𝚙𝚊𝚛𝚊 𝚞𝚗𝚒𝚛𝚝𝚎)
  `.trim()

  await conn.sendMessage(data.chat, {
    text: plantilla,
    edit: data.originalMsg.key,
    mentions: [...data.jugadores, ...data.suplentes]
  })
})
