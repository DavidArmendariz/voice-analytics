from multi_rake import Rake

def _get_keywords(text, language_code):
    rake = Rake(max_words=1, language_code=language_code)
    return {keyword: score for keyword, score in rake.apply(text)}
    