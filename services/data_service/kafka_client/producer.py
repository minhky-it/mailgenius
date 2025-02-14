from confluent_kafka import Producer


config = {
    'bootstrap.servers': 'kafka:9092',
}

producer = Producer(config)



