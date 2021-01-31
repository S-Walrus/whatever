from os import environ
import telebot

TOKEN = environ["SANDWICH_TOKEN"]

bot = telebot.TeleBot(TOKEN, parse_mode="MARKDOWN")
owner_id = "@swalrus"


@bot.message_handler(commands=["start"])
def _send_welcome_message(self, message):
    bot.reply_to(message, "You make your sandwich yourself.")


@bot.message_handler(commands=["help"])
def _send_help_message(message):
    bot.reply_to(message, "You help yourself.\ngammarini.tk/106sandwichrecipies")


def log(text, priority=2):
    bot.send_message(owner_id, text)
