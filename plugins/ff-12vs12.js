let partidasVS12 = {};

let handler = async (m, { conn, args }) => {
  let plantilla = `
𝟏𝟐 𝐕𝐄𝐑𝐒𝐔𝐒 𝟏𝟐

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                            •
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: ${args[0] || ''}
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

        𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
    
    👑 ┇  
    🥷🏻 ┇  
    🥷🏻 ┇ 
    🥷🏻 ┇  

        𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2
    
    👑 ┇  
    🥷🏻 ┇  
    🥷🏻 ┇ 
    🥷🏻 ┇  

        𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 3
    
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
  partidasVS12[msg.key.id] = {
    chat: m.chat,
    jugadores: [],
    suplentes: [],
    originalMsg: msg,
  }
}

handler.help = ['12vs12']
handler.tags = ['freefire']
handler.command = /^(vs12|12vs12)$/i
handler.group = true
handler.admin = true

export default handler;

// Reacción a mensajes
conn.ev.on('messages.upsert', async ({ messages }) => {
  let m = messages[0]
  if (!m?.message?.reactionMessage) return

  let reaction = m.message.reactionMessage
  let key = reaction.key
  let emoji = reaction.text
  let sender = m.key.participant || m.key.remoteJid

  if (!['❤️', '👍🏻'].includes(emoji)) return
  if (!partidasVS12[key.id]) return

  let data = partidasVS12[key.id]

  if (data.jugadores.includes(sender) || data.suplentes.includes(sender)) return
  if (data.jugadores.length < 12) {
    data.jugadores.push(sender)
  } else if (data.suplentes.length < 2) {
    data.suplentes.push(sender)
  } else return

  let j = data.jugadores.map(u => `@${u.split('@')[0]}`)
  let s = data.suplentes.map(u => `@${u.split('@')[0]}`)

  let plantilla = `
𝟏𝟐 𝐕𝐄𝐑𝐒𝐔𝐒 𝟏𝟐

⏱ 𝐇𝐎𝐑𝐀𝐑𝐈𝐎                            •
🇲🇽 𝐌𝐄𝐗𝐈𝐂𝐎 : 
🇨🇴 𝐂𝐎𝐋𝐎𝐌𝐁𝐈𝐀 :                

➥ 𝐌𝐎𝐃𝐀𝐋𝐈𝐃𝐀𝐃: 
➥ 𝐉𝐔𝐆𝐀𝐃𝐎𝐑𝐄𝐒:

        𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 1
    
    👑 ┇ ${j[0] || ''}
    🥷🏻 ┇ ${j[1] || ''}
    🥷🏻 ┇ ${j[2] || ''}
    🥷🏻 ┇ ${j[3] || ''}

        𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 2
    
    👑 ┇ ${j[4] || ''}
    🥷🏻 ┇ ${j[5] || ''}
    🥷🏻 ┇ ${j[6] || ''}
    🥷🏻 ┇ ${j[7] || ''}

        𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 3
    
    👑 ┇ ${j[8] || ''}
    🥷🏻 ┇ ${j[9] || ''}
    🥷🏻 ┇ ${j[10] || ''}
    🥷🏻 ┇ ${j[11] || ''}

    ʚ 𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒:
    🥷🏻 ┇ ${s[0] || ''}
    🥷🏻 ┇ ${s[1] || ''}

(𝚁𝚎𝚊𝚌𝚌𝚒𝚘𝚗𝚊 𝚌𝚘𝚗 ❤️ 𝚙𝚊𝚛𝚊 𝚞𝚗𝚒𝚛𝚝𝚎)
  `.trim()

  await conn.sendMessage(data.chat, {
    text: plantilla,
    edit: data.originalMsg.key,
    mentions: [...data.jugadores, ...data.suplentes]
  })
})
