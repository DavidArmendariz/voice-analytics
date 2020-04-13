from rake_nltk import Metric, Rake
import nltk
r = Rake(language="spanish", min_length=2, max_length=4)
text = "Sí buenos días cómo les va  estamos aquí de nuevo reunidos para expresar nuestros sentimientos y nuestra posición acerca de las medidas económicas que acaba de tomar Lenin Moreno en particular nos sentimos perjudicados como sociedad civil y queremos  tratar de cambiar urgentemente decisiones que se han tomado"
r.extract_keywords_from_text(text)
print(r.get_ranked_phrases_with_scores())
