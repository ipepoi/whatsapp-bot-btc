const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const request = require('request')
const convertRupiah = require('rupiah-format')
let url = 'https://vip.bitcoin.co.id/api/btc_idr/ticker'

const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr,{small: true}, function (qrcode) {
    console.log(qrcode);
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    // Start Command
    if (msg.body == '!cek') {
        request({'url':url, 'json': true }, function (error, response, body) {
            let high = convertRupiah.convert(body.ticker.high)
            let low = convertRupiah.convert(body.ticker.low)
            let vol_btc = convertRupiah.convert(body.ticker.vol_btc)
            let vol_idr = convertRupiah.convert(body.ticker.vol_idr)
            let last = convertRupiah.convert(body.ticker.last)
            let buy = convertRupiah.convert(body.ticker.buy)
            let sell = convertRupiah.convert(body.ticker.sell)
          
const txt = `*BTC Update Check*
High: *${high}*
low : *${low}* 
Vol_BTC : *${body.ticker.vol_btc}* 
Vol_IDR : *${vol_idr}* 
Last : *${last}* 
Buy : *${buy}* 
Sell : *${sell}* 
`
            msg.reply(txt)
          });
    }
    // End Command
});

client.initialize();