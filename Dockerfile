FROM python:3.10-slim-buster

WORKDIR /usr/src/app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . /usr/src/app

CMD [ "python3","-m","flask","run","--host=0.0.0.0" ]