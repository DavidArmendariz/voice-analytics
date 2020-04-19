from dotenv import load_dotenv
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email

load_dotenv()


def send_to_email(data, contact_email):
    message = Mail(
        from_email=Email("darmendarispenya@edu.hse.ru", "David Armendárz"),
        to_emails=contact_email,
        subject="Summary of your analytics")
    message.template_id = "d-90dc3ad01e174f1bbe53c063c1863599"
    message.dynamic_template_data = data
    try:
        sg = SendGridAPIClient(os.environ.get("SENDGRID_API_KEY"))
        sg.send(message)
    except Exception as e:
        print(e)


if __name__ == "__main__":
    data = {
        "date": "19/04/2020",
        "averageSentimentScore": 0.5,
        "averageAudioLength": 2,
        "totalAudioLength": 10,
        "topCategories": "Health, Food",
        "topKeywords": "perro, gato"}
    send_to_email(data)
