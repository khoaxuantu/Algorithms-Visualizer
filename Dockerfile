FROM python:3.10-slim-buster

WORKDIR /usr/src/app

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . /usr/src/app

CMD [ "gunicorn","--bind","0.0.0.0:$PORT","wsgi" ]