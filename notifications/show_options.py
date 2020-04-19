from clear_console import clear
from select_period import select_period
from errors import not_a_number, invalid_option


def show_options(customer):
    while True:
        print("Select one of the options:")
        print("1.- Send notification about general performance")
        print("2.- Send notification about performance of an employee")
        print("3.- Go back")
        try:
            option = int(input())
        except:
            not_a_number()
        if option not in [1, 2, 3]:
            invalid_option()
        else:
            if option == 1:
                clear()
                done = select_period(customer, option)
                if done == -1:
                    pass
                elif done == True:
                    return True
            elif option == 2:
                clear()
                done = select_period(customer, option)
                if done == -1:
                    pass
                elif done == True:
                    return True
            elif option == 3:
                return True
