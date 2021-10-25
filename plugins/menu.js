let levelling = require('../lib/levelling')
let { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
const defaultMenu = {
  before: `

       🌹 𝗛𝗘𝗟𝗟𝗢𝗪𝗢𝗥𝗟𝗗 🌹
	
	┏━━°𖣘❬ *𝙸𝙽𝙵𝙾 𝙾𝚆𝙽𝙴𝚁* ❭𖣘°━━┓   
	┣➥ 𝚈𝚃 : https://youtu.be/_De5EgwBPM8
	┣➥ 𝙸𝙶 :https://www.instagram.com/reteam.id/
        ┣➥ 𝙶𝙲 𝙱𝙾𝚃 : https://bit.ly/3zWEnWt 
        └──
	
	߷❬ *𝗕𝗔𝗜𝗟𝗘𝗬𝗦 𝗦𝗘𝗟𝗙 𝗕𝗢𝗧* ❭߷


%readmore`.trimStart(),
  header: '┏━━☕︎°❬ *%category* ❭°☕︎━━┓',
  body: '┣➥*٬࿊⃟🤡* %cmd %islimit %isPremium',
  footer: '└────\n',
  after: `
*𝚃𝚑𝚊𝚗𝚔𝚜 𝚃𝚘 ☕︎
𒊹︎︎︎𝚁𝙴𝚃𝙴𝙰𝙼 𝙸𝙳
𒊹︎︎︎𝙰𝙳𝙸𝚆𝙰𝙹𝚂𝙷𝙸𝙽𝙶
𒊹︎︎︎𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿
𒊹︎︎︎𝙰𝙻𝙻 𝙲𝚁𝙴𝙰𝚃𝙾𝚁*
${'```Bot WhatsApp```'}
`,
}
let handler = async (m, { conn, usedPrefix: _p, args, command }) => {
  let tags
  let teks = `${args[0]}`.toLowerCase()
  let arrayMenu = ['all', 'game', 'xp', 'stiker', 'kerangajaib', 'quotes', 'admin', 'grup', 'premium', 'internet', 'anonymous', 'nulis', 'downloader', 'tools', 'fun', 'database', 'quran', 'audio', 'jadibot', 'info', 'tanpakategori', 'owner']
  if (!arrayMenu.includes(teks)) teks = '404'
  if (teks == 'all') tags = {
    'main': 'Utama',
    'game': 'Game',
    'xp': 'Exp & Limit',
    'sticker': 'Stiker',
    'kerang': 'Kerang Ajaib',
    'quotes': 'Quotes',
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`,
    'group': 'Grup',
    'premium': 'Premium',
    'internet': 'Internet',
    'anonymous': 'Anonymous Chat',
    'nulis': 'MagerNulis & Logo',
    'downloader': 'Downloader',
    'tools': 'Tools',
    'fun': 'Fun',
    'database': 'Database',
    'vote': 'Voting',
    'absen': 'Absen',
    'quran': 'Al Qur\'an',
    'audio': 'Pengubah Suara',
    'jadibot': 'Jadi Bot',
    'info': 'Info',
    '': 'Tanpa Kategori',
  }
  if (teks == 'game') tags = {
    'game': 'Game'
  }
  if (teks == 'xp') tags = {
    'xp': 'Exp & Limit'
  }
  if (teks == 'stiker') tags = {
    'sticker': 'Stiker'
  }
  if (teks == 'kerangajaib') tags = {
    'kerang': 'Kerang Ajaib'
  }
  if (teks == 'quotes') tags = {
    'quotes': 'Quotes'
  }
  if (teks == 'admin') tags = {
    'admin': `Admin ${global.opts['restrict'] ? '' : '(Dinonaktifkan)'}`
  }
  if (teks == 'grup') tags = {
    'group': 'Grup'
  }
  if (teks == 'premium') tags = {
    'premium': 'Premium'
  }
  if (teks == 'internet') tags = {
    'internet': 'Internet'
  }
  if (teks == 'anonymous') tags = {
    'anonymous': 'Anonymous Chat'
  }
  if (teks == 'nulis') tags = {
    'nulis': 'MagerNulis & Logo'
  }
  if (teks == 'downloader') tags = {
    'downloader': 'Downloader'
  }
  if (teks == 'tools') tags = {
    'tools': 'Tools'
  }
  if (teks == 'fun') tags = {
    'fun': 'Fun'
  }
  if (teks == 'database') tags = {
    'database': 'Database'
  }
  if (teks == 'vote') tags = {
    'vote': 'Voting',
    'absen': 'Absen'
  }
  if (teks == 'quran') tags = {
    'quran': 'Al Qur\'an'
  }
  if (teks == 'audio') tags = {
    'audio': 'Pengubah Suara'
  }
  if (teks == 'jadibot') tags = {
    'jadibot': 'Jadi Bot'
  }
  if (teks == 'info') tags = {
    'info': 'Info'
  }
  if (teks == 'tanpakategori') tags = {
    '': 'Tanpa Kategori'
  }
  if (teks == 'owner') tags = {
    'owner': 'Owner',
    'host': 'Host',
    'advanced': 'Advanced'
  }



  try {
    let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
    let { exp, limit, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    if (teks == '404') {
      return conn.relayWAMessage(conn.prepareMessageFromContent(m.chat, {
        "listMessage": {
          "title": `${ucapan()}, Kack👋🏻 ${name}`.trim(),
          "description": "𝙼𝙰𝙳𝙴 𝚆𝙸𝚃𝙷 𝚁𝙴𝚃𝙴𝙰𝙼",
          "buttonText": "Click Here",
          "listType": "SINGLE_SELECT",
          "sections": [
            {
              "rows": [
                {
                  "title": `Semua Perintah`,
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐒𝐄𝐌𝐔𝐀 𝐅𝐈𝐓𝐔𝐑",
                  "rowId": `${_p}? all`
                }, {
                  "title": "Game",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐆𝐀𝐌𝐄",
                  "rowId": `${_p}? game`

                }, {
                  "title": "XP",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐗𝐏",
                  "rowId": `${_p}? xp`

                }, {
                  "title": "Stiker",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐒𝐓𝐈𝐂𝐊𝐄𝐑",
                  "rowId": `${_p}? stiker`
                }, {
                  "title": "Kerang Ajaib",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐊𝐄𝐑𝐀𝐍𝐆 𝐀𝐉𝐀𝐈𝐁",
                  "rowId": `${_p}? kerangajaib`
                }, {
                  "title": "Quotes",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐐𝐔𝐎𝐓𝐄𝐒",
                  "rowId": `${_p}? quotes`
                }, {
                  "title": "Admin",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐀𝐃𝐌𝐈𝐍",
                  "rowId": `${_p}? admin`
                }, {
                  "title": "Grup",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐆𝐑𝐔𝐏",
                  "rowId": `${_p}? grup`
                }, {
                  "title": "Premium",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐏𝐑𝐄𝐌𝐈𝐔𝐌",
                  "rowId": `${_p}? premium`
                }, {
                  "title": "Internet",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐈𝐍𝐓𝐄𝐑𝐍𝐄𝐓",
                  "rowId": `${_p}? internet`
                }, {
                  "title": "Anonymous",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐀𝐍𝐎𝐍𝐘𝐌𝐎𝐔𝐒",
                  "rowId": `${_p}? anonymous`
                }, {
                  "title": "Nulis & Logo",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐍𝐔𝐋𝐈𝐒",
                  "rowId": `${_p}? nulis`
                }, {
                  "title": "Downloader",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑",
                  "rowId": `${_p}? downloader`
                }, {
                  "title": "Tools",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐓𝐎𝐎𝐋𝐒",
                  "rowId": `${_p}? tools`
                }, {
                  "title": "Fun",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐅𝐔𝐍",
                  "rowId": `${_p}? fun`
                }, {
                  "title": "Database",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐃𝐀𝐓𝐀𝐁𝐀𝐒𝐄",
                  "rowId": `${_p}? database`
                }, {
                  "title": "Vote & Absen",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐕𝐎𝐓𝐄",
                  "rowId": `${_p}? vote`
                }, {
                  "title": "Al-Qur\'an",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐀𝐋-𝐐𝐔𝐑 𝐀𝐍",
                  "rowId": `${_p}? quran`
                }, {
                  "title": "Pengubah Suara",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐏𝐄𝐍𝐆𝐔𝐁𝐀𝐇 𝐒𝐔𝐀𝐑𝐀",
                  "rowId": `${_p}? audio`
                }, {
                  "title": "Jadi Bot",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐉𝐀𝐃𝐈𝐁𝐎𝐓",
                  "rowId": `${_p}? jadibot`
                }, {
                  "title": "Info",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐈𝐍𝐅𝐎",
                  "rowId": `${_p}? info`
                }, {
                  "title": "Tanpa kategori",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐓𝐀𝐍𝐏𝐀 𝐊𝐀𝐓𝐄𝐆𝐎𝐑𝐈",
                  "rowId": `${_p}? tanpakategori`
                }, {
                  "title": "Owner",
                  "description": "𝐌𝐄𝐍𝐀𝐌𝐏𝐈𝐋𝐊𝐀𝐍 𝐌𝐄𝐍𝐔 𝐎𝐖𝐍𝐄𝐑",
                  "rowId": `${_p}? owner`
                }
              ]
            }
          ], "contextInfo": {
            "stanzaId": m.key.id,
            "participant": m.sender,
            "quotedMessage": m.message
          }
        }
      }, {}), { waitForAck: true })
    }
    // gunakan ini jika kamu menggunakan whatsapp bisnis
    //   throw `
    // ┌〔 DAFTAR MENU 〕
    // ├ ${_p + command} all
    // ├ ${_p + command} game
    // ├ ${_p + command} xp
    // ├ ${_p + command} stiker
    // ├ ${_p + command} kerang
    // ├ ${_p + command} quotes
    // ├ ${_p + command} admin
    // ├ ${_p + command} group
    // ├ ${_p + command} premium
    // ├ ${_p + command} internet
    // ├ ${_p + command} anonymous
    // ├ ${_p + command} nulis
    // ├ ${_p + command} downloader
    // ├ ${_p + command} tools
    // ├ ${_p + command} fun
    // ├ ${_p + command} database
    // ├ ${_p + command} vote
    // ├ ${_p + command} quran
    // ├ ${_p + command} audio
    // ├ ${_p + command} jadibot
    // ├ ${_p + command} info
    // ├ ${_p + command} tanpa kategori
    // ├ ${_p + command} owner
    // └────  
    //     `.trim()
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let plugin of help)
        if (plugin.tags && plugin.tags.includes(tag))
          if (plugin.help) groups[tag].push(plugin)
      // for (let tag of plugin.tags)
      //   if (!(tag in tags)) tags[tag] = tag
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Dipersembahkan oleh https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '(Limit)' : '')
                .replace(/%isPremium/g, menu.premium ? '(Premium)' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      me: conn.user.name,
      npmname: package.name,
      npmdesc: package.description,
      version: package.version,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp <= 0 ? `Siap untuk *${_p}levelup*` : `${max - exp} XP lagi untuk levelup`,
      github: package.homepage ? package.homepage.url || package.homepage : '[unknown github url]',
      level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    await conn.send2ButtonLoc(m.chat, await (await fetch(fla + teks)).buffer(), text.trim(), '𝑴𝒂𝒅𝒆 𝒘𝒊𝒕𝒉 @𝑟𝑒𝑡𝑒𝑎𝑚', 'Owner', `${_p}owner`, 'Donasi', `${_p}donasi`, m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu', 'help', '?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 3

module.exports = handler

const more = String.fromCharCode(1)
const readMore = more.repeat(1)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
function ucapan() {
  const time = moment.tz('Asia/Jakarta').format('HH')
  res = "Selamat dinihari"
  if (time >= 4) {
    res = "Selamat pagi"
  }
  if (time > 10) {
    res = "Selamat siang"
  }
  if (time >= 15) {
    res = "Selamat sore"
  }
  if (time >= 18) {
    res = "Selamat malam"
  }
  return res
}
