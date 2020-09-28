from clear_console import clear
from errors import not_a_number, invalid_option
from analyze_general_performance import analyze_general_performance
from datetime import datetime, timedelta
from send_to_dashboard import send_to_dashboard
from send_to_email import send_to_email


def select_channel(customer, option, channel):
    while True:
        print("Where do you want your notifications to be sent?")
        print("1.- To the dashboard")
        print("2.- Email")
        print("3.- Go back")
        try:
            channel = int(input())
            end_date = datetime.today()
            start_date = end_date - timedelta(days=2)
            start_date = start_date.replace(hour=0, minute=0, second=0)
            end_date = end_date.replace(hour=23, minute=49, second=59)
        except:
            not_a_number()
        if channel not in [1, 2, 3]:
            invalid_option()
        if channel == 3:
            return -1
        else:
            clear()
            notification_info, formatted_message = analyze_general_performance(
                customer["uid"], start_date, end_date)
            if channel == 1:
                print("Sending your notification to the dashboard...")
                notification = {"date": datetime.today(
                ), "seen": False, "message": formatted_message}
                send_to_dashboard(customer["uid"], notification)
                return True
            elif channel == 2:
                contact_email = customer["contactEmail"]
                print(f"Sending your notification to {contact_email}")
                send_to_email(notification_info, customer["contactEmail"])
                return True
