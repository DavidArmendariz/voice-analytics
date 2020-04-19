from clear_console import clear
from select_channel import select_channel
from errors import not_a_number, invalid_option


def select_period(customer, option):
    while True:
        print("How many days you want to analyze?")
        print("Example 1: if you want to analyze the last seven days, type 7.")
        print("Example 2: if you want to analyze the last month, type 30.")
        print("Example 3: if you want to analyze today's data, type 0.")
        print("If you want to go back, type -1")
        try:
            days = int(input())
        except:
            not_a_number()
        if days == -1:
            clear()
            return -1
        elif days < -1:
            invalid_option()
        else:
            clear()
            done = select_channel(customer, option, days)
            if done == -1:
                clear()
            elif done == True:
                return True
