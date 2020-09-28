from googletrans import Translator
import sys

translator = Translator()


def _get_translation(text):
    translation = translator.translate(text).text
    detected_language = translator.detect(text).lang
    return translation, detected_language


if __name__ == "__main__":
    print(_get_translation(*sys.argv[1:]))
