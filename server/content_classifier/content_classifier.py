from google.cloud import language_v1
from google.cloud.language_v1 import enums


def _content_classifier(text_content, language=None):
    """
    Classifying Content in a String

    Args:
      text_content The text content to analyze. Must include at least 20 words.
    """

    client = language_v1.LanguageServiceClient()
    type_ = enums.Document.Type.PLAIN_TEXT
    document = {"content": text_content, "type": type_}
    if language:
        document.update({"language": language})

    response = client.classify_text(document)
    categories = dict()
    for category in response.categories:
        categories[category.name.split("/")[-1]] = category.confidence
    return categories
