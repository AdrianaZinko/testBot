const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const my_const = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) =>ctx.reply(`hy ${ctx.message.from.first_name}`))
bot.help((ctx) => ctx.reply(my_const.commands))
bot.command('course', async (ctx) => {
    try {
      await ctx.replyWithHTML('<b>Курсы2222</b>', Markup.inlineKeyboard(
        [
          [Markup.button.callback('Редакторы', 'btn_1'), Markup.button.callback('Обзоры', 'btn_2'),
           Markup.button.callback('JS', 'btn_3')]
        ]
      ))
    } catch (e) {
      console.error(e)
    }
  })
  function addActionBot(id_btn, src_img, text, preview) {
    bot.action(id_btn, async (ctx) => {
      try {
        await ctx.answerCbQuery()
        if (src_img !== false) {
          await ctx.replyWithPhoto({
            source: src_img
          })
        }
        await ctx.replyWithHTML(text, {
          disable_web_page_preview: preview
        })
      } catch (e) {
        console.error(e)
      }
    })
  }
  addActionBot('btn_1', './img/1.jpg', my_const.text1, true)
addActionBot('btn_2', './img/2.jpg', my_const.text2, true)
addActionBot('btn_3', false, my_const.text3, false)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM')) 