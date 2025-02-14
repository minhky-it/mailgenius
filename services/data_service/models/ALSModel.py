import findspark
findspark.init("/usr/lib/spark")

import json
from flask_restful import Resource
from pyspark.ml.recommendation import ALS
from models.SparkSessionSingleton import SparkSessionSingleton

class ALSModel(Resource):
    def __init__(self, user_id, transaction_path):
        self.spark = None
        self.user_id = user_id
        self.transaction_path = transaction_path

        self.data = None
        self.model = None
        self.user_recommendations = None
        self.dataset = self.transaction_path

    def introduce(self):
       if self.spark is None:
            self.spark = SparkSessionSingleton.get_spark_session()
            self.spark.sparkContext.setLogLevel("ERROR")
         
    def load_data(self):
        if self.dataset is None:
            raise ValueError("Dataset path is required")
        self.data = self.spark.read.csv(self.dataset, header=True, inferSchema=True)

    def train_model(self):
        als = ALS(maxIter=10, regParam=0.01, 
                  userCol="user_id", itemCol="product_id", ratingCol="rating",
                  coldStartStrategy="drop")

        self.model = als.fit(self.data)

    def user_recommendation(self, num_recs):
        if not self.model:
            raise ValueError("Model must be trained before generating recommendations.")

        # Get recommendations for all items
        product_recs = self.model.recommendForAllItems(num_recs)

        # Extract item and user information
        item_info = self.data.select("product_id", "product_name").dropDuplicates()
        user_info = self.data.select("user_id", "email").dropDuplicates()

        # Enrich recommendations with product information
        enriched_recs = product_recs.join(item_info, on="product_id", how="left")

        # Store the recommendations and user info for later use
        self.user_recommendations = enriched_recs
        self.user_info = user_info
        return enriched_recs

    def recommendations_to_json(self):
        if not self.user_recommendations:
            raise ValueError("No recommendations found. Please run 'user_recommendation' first.")

        # Collect recommendations and user info
        recommendations_data = self.user_recommendations.collect()
        user_info_data = {row["user_id"]: row["email"] for row in self.user_info.collect()}

        recommendations_json = []

        for row in recommendations_data:
            # Extract detailed information for each product
            product_id = row["product_id"]
            product_name = row["product_name"] if "product_name" in row else "Unknown"
            recommendations = row["recommendations"]

            # Match user_id to email for each recommendation
            enriched_recommendations = [
                {
                    "user_id": rec["user_id"],
                    "rating": rec["rating"],
                    "email": user_info_data.get(rec["user_id"], "Unknown")
                }
                for rec in recommendations
            ]

            # Create the product recommendation dictionary
            product_recs = {
                "product_id": product_id,
                "product_name": product_name,
                "recommendations": enriched_recommendations
            }
            recommendations_json.append(product_recs)

        # Convert to JSON string with indentation for readability
        return json.dumps(recommendations_json, indent=2)
    
    @staticmethod
    def run(user_id, transaction_path, num_recs):
        als_model = ALSModel(user_id, transaction_path)
        als_model.introduce()
        als_model.load_data()
        als_model.train_model()
        als_model.user_recommendation(num_recs)
        
        recommendations_json = als_model.recommendations_to_json()
        return recommendations_json