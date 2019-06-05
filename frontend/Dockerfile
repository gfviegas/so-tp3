FROM node:12.2.0

# Criando diretório onde o código estará
RUN mkdir /code
WORKDIR /code

# Adicionando os node_modules no $PATH
ENV PATH /code/node_modules/.bin:$PATH

# Instalando módulos
COPY package.json .
COPY yarn.lock .
RUN yarn --silent
RUN yarn add global react-scripts@3.0.1 --silent

# Inciando
CMD ["yarn", "start"]
