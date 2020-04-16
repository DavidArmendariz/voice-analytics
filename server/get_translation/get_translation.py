from googletrans import Translator
import sys

def _get_translation(text):
    translator = Translator()
    return translator.translate(text).text

if __name__ == "__main__":
    print(_get_translation(*sys.argv[1:]))
