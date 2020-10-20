// 引用 line 機器人套件
import linebot from 'linebot'
// 引用 dotenv 套件
import dotenv from 'dotenv'

import axios from 'axios'

// 讀取.env
dotenv.config()

// 設定機器人
const bot = linebot({
  // process.env.設定名稱  處理程序的環境
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', async event => {
  try {
    const response = await axios.get('https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6')
    // 對bot說的話
    const text = event.message.text
    let reply = ''
    for (const data of response.data) {
      // 若data中的title = line說的話
      if (data.title === text) {
        reply = (data.showInfo[0].locationName)
        break
      }
    }
    reply = (reply.length === 0) ? '找不到資料' : reply
    event.reply(reply)
  } catch (error) {
    event.reply('發生錯誤')
  }
})

bot.listen('/', process.env.PORT, () => {
  console.log('機器人已啟動')
})
