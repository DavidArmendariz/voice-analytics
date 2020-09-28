from clear_console import clear
from get_customers import customers
from show_options import show_options
import time

def admin():
    while True:
        print("Welcome to the notifications manager. Please select one of the customers to continue: ")
        for index, customer in enumerate(customers):
            customer_name = customer["customerName"]
            print(f"{index+1}.- {customer_name}")
        last_option = len(customers)+1
        print(f"{last_option}.- Exit")
        try:
            option = int(input())
        except:
            print("Not a number. Please try again.")
        if option not in range(1, len(customers)+2):
            clear()
            print("Invalid option. Please try again!")
        elif option == (len(customers)+1):
            break
        else:
            customer = customers[option-1]
            clear()
            show_options(customer)
            print("Message sent successfully!")
            time.sleep(4)
        clear()


if __name__ == '__main__':
    admin()
