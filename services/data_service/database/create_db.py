import psycopg2
from psycopg2 import sql

def create_db():
    db_user = "postgres"
    db_password = "postgres"
    db_host = "postgres_data_service"
    db_port = "5432"
    db_name = "data_db"

    conn = psycopg2.connect(dbname="postgres", user=db_user, password=db_password, host=db_host, port=db_port)
    conn.autocommit = True
    cursor = conn.cursor()

    cursor.execute(sql.SQL("SELECT 1 FROM pg_catalog.pg_database WHERE datname = %s"), [db_name])
    exists = cursor.fetchone()

    if not exists:
        cursor.execute(sql.SQL("CREATE DATABASE {}").format(sql.Identifier(db_name)))
        print(f"Database {db_name} created.")
    else:
        print(f"Database {db_name} already exists.")

    cursor.close()
    conn.close()

    # Kết nối vào cơ sở dữ liệu đã tạo
    conn = psycopg2.connect(dbname=db_name, user=db_user, password=db_password, host=db_host, port=db_port)
    print(f"Connected to the database {db_name}.")
