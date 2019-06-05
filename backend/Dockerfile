FROM python:3

# Atualizando o PIP
RUN pip install --upgrade pip

# Criando diretório onde o código estará
ENV APP /code
RUN mkdir $APP
WORKDIR $APP

# Primeiro copiando o requirements e instalando os pacotes.
# Copiando antes ganhamos performance com cache de layers
# COPY requirements.txt .
# RUN pip install -r requirements.txt

# Copia o resto do código
COPY . .

# Expõe porta 5000
EXPOSE 5000

ENV FLASK_APP api
ENV FLASK_ENV development

RUN pip install -e .

# Roda o entrypoint
CMD ["flask", "run", "--host=0.0.0.0"]
