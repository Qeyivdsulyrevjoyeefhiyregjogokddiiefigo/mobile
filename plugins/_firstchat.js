let moment = require('moment-timezone')
let handler = m => m

handler.all = async function (m) {

    if (m.chat.endsWith('broadcast')) return
    if (m.fromMe) return
    if (m.isGroup) return
    if (db.data.settings.groupOnly) return
    let user = global.db.data.users[m.sender]
    if (new Date - user.pc < 86400000) return // setiap 24 jam sekali
    await this.sendButton(m.chat, `
Hai, ${ucapan()}

${user.banned ? 'kamu dibanned' : 'Ada yang bisa saya bantu?\nKetik .menu untuk menampilkan list menu\nJika mau chat dengan simi ketik #on simi atau klick di bawah\n Jika mau offin chat simi ketik .off simi\n\nhttps://chat.whatsapp.com/FD3C7XgqSTbCD9IEp4oVSC'}
`.trim(), 'Assalamualaikum\nWallaikumsalam', user.banned ? 'Owner 👑' : 'Nyalakan chat simi', user.banned ? ',owner' : ',on simi', m)
    user.pc = new Date * 1
}

module.exports = handler
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
