import google.generativeai as genai
import re
from langdetect import detect
genai.configure(api_key="AIzaSyDGesO6awURx6y1nJqP0_e1B9IoSYWkGuA")

from flask import request, jsonify, Blueprint, g
from middleware.auth import auth_required

generate_bp = Blueprint('generate_bp', __name__)

@generate_bp.route("/generate", methods=['POST'])
@auth_required
def generateEmail():
    data = request.get_json()
    product_name = data['name']
    product_description = data['description']
    product_link = data['link']
    product_image = data['image']

    model = genai.GenerativeModel("gemini-1.5-flash")

    # Gọi API Gemini
    chat = model.start_chat(
        history=[
            {
                "role": "user",
                "parts": "You are an assistant helping me create an Email Marketing. And when you reply, just show me the html code"
            },
            {
                "role": "model",
                "parts": f"Create an email marketing HTML for the product: {product_name}. The product description is: {product_description}. The product link is: {product_link}. The image of the product is: {product_image}"
            }
        ]
    )
    # Trích xuất nội dung từ phản hồi (Có thể khác với OpenAI)
    response = chat.send_message("chỉ hiển thị mã html và thiết kế một email bắt mắt")
    htmlRaw = response.text

    match = re.search(r"<html.*?</html>", htmlRaw, re.DOTALL)
    if match:
        extracted_content = match.group(0)

    return jsonify({"message": "Email Marketing HTML generated successfully",
                    "data": extracted_content
        }), 200
    

@generate_bp.route("/generate/seo-booster", methods=['POST'])
@auth_required
def generateHeadingSEO():
    try:
        data = request.get_json()
        # Tạo dictionary từ data
        data_dict = {
            "title": data["title"],
            "description": data["metaDescription"],
            "keywords": data["metaKeywords"],
            "h1": data["h1"],
            "h2": data["h2"],
            "h3": data["h3"],
            "h4": data["h4"],
            "h5": data["h5"],
            "h6": data["h6"],
            "formated_url": data["formattedUrl"],
        }

        prepairString = ', '.join([f'"{key}": "{value}"' for key, value in data_dict.items() if value is not None])


        model = genai.GenerativeModel("gemini-1.5-flash")
        input_language = detect(data_dict["title"])
        if input_language == 'vi': 
            language_instructions = "Your responses should be in Vietnamese."
        else: 
            language_instructions = "Your responses should be in English."
        # Gọi API Gemini
        chat = model.start_chat(
            history=[
                {
                    "role": "user",
                    "parts": f"You are an assistant helping me edit content of my website for SEO. {language_instructions}"
                },
                {
                    "role": "model",
                    "parts": f"Give the recommendation depend on {prepairString}"
                }
            ]
        )
        # Trích xuất nội dung từ phản hồi (Có thể khác với OpenAI)
        response = chat.send_message("Hãy cho tôi câu trả lời")
        htmlRaw = response.text


        return jsonify({"message": "Email Marketing HTML generated successfully",
                        "data": htmlRaw
            }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    