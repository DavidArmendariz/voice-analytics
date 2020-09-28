from google.cloud import language_v1
from google.cloud.language_v1 import enums


def _get_entity_sentiment(text_content, language):
    client = language_v1.LanguageServiceClient()
    type_ = enums.Document.Type.PLAIN_TEXT
    document = {"content": text_content, "type": type_, "language": language}
    encoding_type = enums.EncodingType.UTF8
    response = client.analyze_entity_sentiment(
        document, encoding_type=encoding_type)
    results = list()
    for entity in response.entities:
        result = dict()
        result["nameOfEntity"] = entity.name
        result["entityType"] = enums.Entity.Type(entity.type).name
        result["salienceScore"] = round(entity.salience, 2)
        result["sentimentScore"] = round(entity.sentiment.score, 2)
        result["sentimentMagnitude"] = round(entity.sentiment.magnitude, 2)
        results.append(result)
    return results
