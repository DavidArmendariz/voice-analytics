from multi_rake import Rake

text = "Sí buenos días cómo les va  estamos aquí de nuevo reunidos para expresar nuestros sentimientos y nuestra posición acerca de las medidas económicas que acaba de tomar Lenin Moreno en particular nos sentimos perjudicados como sociedad civil y queremos  tratar de cambiar urgentemente decisiones que se han tomado"
rake = Rake(max_words=1, language_code="es")
keywords = list(map(lambda keyword: {keyword[0]: keyword[1]},rake.apply(text)))
print(keywords)
