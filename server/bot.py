from os import environ
import telebot

with open("SANDWICH_TOKEN") as f:
    TOKEN = f.read().strip()

bot = telebot.TeleBot(TOKEN, parse_mode="MARKDOWN")
owner_id = "182762538"

def log(text, priority=2):
    bot.send_message(owner_id, text)
