import findspark
findspark.init("/usr/lib/spark")  # Chỉ định đúng đường dẫn tới Spark
from pyspark.sql import SparkSession

class SparkSessionSingleton:
    _spark_session = None

    @staticmethod
    def get_spark_session():
        print("Accessing SparkSessionSingleton._spark_session:", SparkSessionSingleton._spark_session)
        if SparkSessionSingleton._spark_session is None:
            SparkSessionSingleton._spark_session = SparkSession.builder \
                .appName("ALS-MODEL") \
                .config("spark.master", "local") \
                .getOrCreate()
        return SparkSessionSingleton._spark_session