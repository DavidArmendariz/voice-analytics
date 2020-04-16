from google.cloud import language_v1
from google.cloud.language_v1 import enums
import sys

def _get_sentiment(text_content, language=None):
    client = language_v1.LanguageServiceClient()
    type_ = enums.Document.Type.PLAIN_TEXT
    document = {"content": text_content, "type": type_}
    if language:
        document.update({"language": language})
    encoding_type = enums.EncodingType.UTF8
    response = client.analyze_sentiment(document, encoding_type=encoding_type)
    print(u"Document sentiment score: {}".format(response.document_sentiment.score))
    print(
        u"Document sentiment magnitude: {}".format(
            response.document_sentiment.magnitude
        )
    )
    for sentence in response.sentences:
        print(u"Sentence text: {}".format(sentence.text.content))
        print(u"Sentence sentiment score: {}".format(sentence.sentiment.score))
        print(u"Sentence sentiment magnitude: {}".format(sentence.sentiment.magnitude))
    print(u"Language of the text: {}".format(response.language))

if __name__ == "__main__":
    _get_sentiment(*sys.argv[1:])