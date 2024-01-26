# This file manages the server used to process the back-end application process of the uploaded images
from flask import Flask, render_template, request, jsonify
import os
app = Flask (__name__)

# root decorator
@app.route("/")
def home():
    return render_template("home.html")

# Upload handling of the image
@app.route("/uploadLogo", methods = ['POST'])
def upload_logo():
    try:
        logo_file = request.files['logo']
        timestamp = request.form['timestamp']

        # the save the file locally (account for differnet OS system)
        save_path = os.path.join(app.root_path, 'static', 'images', 'preserved-logo-images', logo_file.filename)
        logo_file.save(save_path)

        # record such a record in MySQL for further references:

        return jsonify({"message": "Logo successfully uploaded!","StorageID" : "NA"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# handling of image extraction

# enable debugging, assuming a development environment
if __name__ == '__main__':
    app.run(debug=True)