from flask import Flask, request, jsonify
import random
import mysql.connector

app = Flask(__name__)

# Połączenie z bazą danych MySQL (dostosuj do własnych danych)
db_connection = mysql.connector.connect(
    host="s33.server-panel.net",
    user="u4885608_main",
    password="zihbah-zinbar-xakBo9",
    database="u4885608_apikeys"
)

# Przykładowy klucz API (w rzeczywistości użyj bezpiecznego sposobu przechowywania)
# Ten klucz zostanie usunięty, a klucze będą pobierane z bazy danych
valid_api_key = get_valid_api_keys()

def get_valid_api_keys():
    cursor = db_connection.cursor()
    cursor.execute("SELECT key_value FROM api_keys")
    keys = cursor.fetchall()
    cursor.close()
    return [key[0] for key in keys]

@app.route('/api/get-emoji', methods=['GET'])
def get_random_emoji():
    api_key = request.headers.get('Api-Key')

    # Sprawdź, czy przekazany klucz API jest poprawny
    valid_api_keys = get_valid_api_keys()

    if api_key in valid_api_keys:
        # Losuj emoji (tutaj możesz użyć dowolnej logiki generowania emoji)
        emojis = ["😊", "🚀", "🎉", "🌈", "🍕"]
        random_emoji = random.choice(emojis)

        return jsonify({"emoji": random_emoji})
    else:
        return jsonify({"error": "Invalid API key"}), 401

if __name__ == '__main__':
    app.run(debug=True)