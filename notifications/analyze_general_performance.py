from datetime import datetime, timedelta
from get_data_from_everyone import get_data_from_everyone
import pandas as pd
import pickle
from functools import reduce
from statistics import mean
import itertools
from collections import Counter


def get_sentiment(row):
    return row["sentiment"]["documentSentimentScore"]


def get_audio_length(row):
    return row["audioLength"]


def get_categories(row):
    return list(row["categories"].keys())


def get_keywords(row):
    return list(row["keywords"].keys())


def analyze_general_performance(customer_uid, start_date, end_date):
    raw_data = get_data_from_everyone(customer_uid, start_date, end_date)
    average_sentiment_score = mean(map(get_sentiment, raw_data))
    average_audio_length = mean(map(get_audio_length, raw_data))
    total_audio_length = sum(map(get_audio_length, raw_data))
    categories = list(itertools.chain.from_iterable(
        map(get_categories, raw_data)))
    categories_counter = Counter(categories)
    top_categories = ", ".join(
        map(lambda category: category[0], categories_counter.most_common(5)))
    keywords = list(itertools.chain.from_iterable(map(get_keywords, raw_data)))
    keywords_counter = Counter(keywords)
    top_keywords = ", ".join(
        map(lambda keyword: keyword[0], keywords_counter.most_common(5)))
    result = {"averageSentimentScore": average_sentiment_score,
              "averageAudioLength": average_audio_length,
              "totalAudioLength": total_audio_length,
              "topCategories": top_categories,
              "topKeywords": top_keywords}
    formatted_message = f"""
    Average sentiment score: {average_sentiment_score}
    Average audio length: {average_audio_length}
    Total audio length: {total_audio_length}
    Top categories: {top_categories}
    Top keywords: {top_keywords}
    """
    return result, formatted_message


if __name__ == "__main__":
    end_date = datetime.today()
    start_date = end_date - timedelta(days=2)
    start_date = start_date.replace(hour=0, minute=0, second=0)
    end_date = end_date.replace(hour=23, minute=49, second=59)
    analyze_general_performance(
        "MXCwUZ4B7fYqOezWTS1gGUWcjiW2", start_date, end_date)
