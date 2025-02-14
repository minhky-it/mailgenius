FROM python:3.11
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    && rm -rf /var/lib/apt/lists/*
ENV JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
ENV SPARK_HOME=/usr/lib/spark
ENV PATH=$PATH:$JAVA_HOME/bin:$SPARK_HOME/bin
COPY ./utils/openjdk-8u432-b06-linux-x64.tar.gz /tmp/
RUN mkdir -p /usr/lib/jvm && \
    tar -xzf /tmp/openjdk-8u432-b06-linux-x64.tar.gz -C /usr/lib/jvm && \
    mv /usr/lib/jvm/* /usr/lib/jvm/java-8-openjdk-amd64 && \
    rm /tmp/openjdk-8u432-b06-linux-x64.tar.gz
RUN ls -la /usr/lib/jvm && ls -la /usr/lib/jvm/java-8-openjdk-amd64
COPY ./utils/spark-3.1.1-bin-hadoop3.2.gz /tmp/
RUN tar -xvf /tmp/spark-3.1.1-bin-hadoop3.2.gz -C /opt/ && \
    mv /opt/spark-3.1.1-bin-hadoop3.2 /usr/lib/spark && \
    rm /tmp/spark-3.1.1-bin-hadoop3.2.gz
COPY ./utils/pyspark-3.1.1.tar.gz /tmp/
RUN pip install /tmp/pyspark-3.1.1.tar.gz && rm /tmp/pyspark-3.1.1.tar.gz
WORKDIR /app
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt
RUN echo '*.gz' >> .dockerignore
COPY . /app
EXPOSE 3004
CMD ["python", "run.py"]