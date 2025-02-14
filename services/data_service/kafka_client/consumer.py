from confluent_kafka import Consumer, KafkaException, KafkaError
import json

def listenAuthTopic(request_id):

    consumer = Consumer({
        'bootstrap.servers': 'kafka:9092',  # Cấu hình Kafka
        'group.id': 'data-service-group',
        'auto.offset.reset': 'earliest'  # Đảm bảo nhận tất cả các message
    })

    consumer.subscribe(['auth-responses'])  # Đăng ký với topic "auth-responses"

    try:
        while True:
            msg = consumer.poll(1.0)  # Polling Kafka với timeout 1 giây

            if msg is None:  # Nếu không có message nào mới
                continue
            if msg.error():
                if msg.error().code() == KafkaError._PARTITION_EOF:
                    continue
                else:
                    raise KafkaException(msg.error())

            response = json.loads(msg.value().decode('utf-8'))

            if response.get('requestId') == request_id:
                if response.get('isValid'):
                    return {
                        "user": response.get("user")
                    }
                else:
                    return None 

    finally:
        consumer.close()
