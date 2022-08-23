FROM python:3.8.5-alpine
WORKDIR /usr/src/app
COPY ./src ./src
COPY ./requirements.txt ./requirements.txt
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install -r requirements.txt
CMD python3 ./src/app.py