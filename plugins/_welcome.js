import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let chat = global.db.data.chats[m.chat] ??= {}
  chat.sWelcome ??= ''
  chat.sBye ??= ''
  chat.bienvenida ??= true

  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://cdn.russellxz.click/ade6d7b4.jpg')
  let img = await (await fetch(pp)).buffer()

  let user = `@${m.messageStubParameters[0].split('@')[0]}`
  let group = groupMetadata.subject
  let desc = groupMetadata.desc || 'sin descripción'

  const crearMensaje = (plantilla, defecto) => {
    return typeof plantilla === 'string' && plantilla
      ? plantilla
          .replace('@user', user)
          .replace('@group', group)
          .replace('@desc', desc)
      : defecto
  }

  if (chat.bienvenida && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let bienvenida = crearMensaje(
      chat.sWelcome,
      `👋🏻 Bienvenido/a\n「 ${user} 」\n⚡ Grupo: ${group}\n✨ Descripción:\n${desc}`
    )
    await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: [m.messageStubParameters[0]] })
  }

  if (chat.bienvenida && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE) {
    let bye = crearMensaje(
      chat.sBye,
      `「 ${user} 」ha salido del grupo 👋🏻`
    )
    await conn.sendMessage(m.chat, { image: img, caption: bye, mentions: [m.messageStubParameters[0]] })
  }

  if (chat.bienvenida && m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    let kick = crearMensaje(
      chat.sBye,
      `「 ${user} 」ha salido del grupo 👋🏻`
    )
    await conn.sendMessage(m.chat, { image: img, caption: kick, mentions: [m.messageStubParameters[0]] })
  }
      }
