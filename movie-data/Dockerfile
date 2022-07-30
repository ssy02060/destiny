FROM python:3.8.5-alpine
WORKDIR /test
COPY ./src ./src
COPY ./requirements.txt ./requirements.txt
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install --user -r requirements.txt
EXPOSE 5000
CMD python3 ./src/app.py
