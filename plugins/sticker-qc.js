import { sticker } from '../lib/sticker.js';
import axios from 'axios';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  const who = m.sender; // Definimos al autor del mensaje
  let text;

  if (args.length >= 1) {
    text = args.join(" ");
  } else if (m.quoted && m.quoted.text) {
    text = m.quoted.text;
  } else {
    return conn.reply(m.chat, '🚩 Te Faltó El Texto!', m);
  }

  if (text.length > 40)
    return conn.reply(m.chat, '🚩 El texto no puede tener más de 40 caracteres', m);

  const pp = await conn.profilePictureUrl(who).catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png');
  const nombre = await conn.getName(who);

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        displayName: nombre,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${nombre}\nFN:${nombre}\nTEL;type=CELL;type=VOICE;waid=${who.split('@')[0]}:${who.split('@')[0]}\nEND:VCARD`
      }
    }
  };

  const obj = {
    type: "quote",
    format: "png",
    backgroundColor: "#000000",
    width: 512,
    height: 768,
    scale: 2,
    messages: [
      {
        entities: [],
        avatar: true,
        from: {
          id: 1,
          name: nombre,
          photo: { url: pp }
        },
        text: text,
        replyMessage: {}
      }
    ]
  };

  try {
    const { data } = await axios.post('https://bot.lyo.su/quote/generate', obj, {
      headers: { 'Content-Type': 'application/json' }
    });

    const buffer = Buffer.from(data.result.image, 'base64');
    const stiker = await sticker(buffer, false, global.packname, global.author);

    if (stiker) return conn.sendFile(m.chat, stiker, 'quote.webp', '', fkontak);
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '❌ Ocurrió un error al generar la imagen.', m);
  }
};

handler.help = ['qc'];
handler.tags = ['sticker'];
handler.command = ['qc'];

export default handler;
