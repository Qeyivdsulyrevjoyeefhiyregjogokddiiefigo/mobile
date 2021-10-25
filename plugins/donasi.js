let fetch = require('node-fetch')
let handler = async (m, { conn }) => await conn.sendButtonLoc(m.chat, await (await fetch(fla + 'donasi')).buffer(), `
┌〔 Donasi • Emoney 〕
├ donasi hanya via doa bismillahirrahmanirrahim semoga yang baca bisa sukses dan dapat hidayah di kehidupan nya...
└────
`.trim(), '𝚁𝙴𝚃𝙴𝙰𝙼.𝙸𝙳', 'Donasi', '.donasi', m)
handler.help = ['donasi']
handler.tags = ['info']
handler.command = /^dona(te|si)$/i

module.exports = handler
