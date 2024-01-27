# This file manages the server used to process the back-end application process of the uploaded images
from flask import Flask, render_template, request, jsonify
import os
from flask_mysqldb import MySQL
app = Flask (__name__)

# configure the mysql connectivity
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'logo_server0517'
app.config['MYSQL_PASSWORD'] = '4uRg#2pW!9Ls'
app.config['MYSQL_DB'] = 'logo_image_server'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

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
        new_id = save_Image_Path(save_path, timestamp)

        return jsonify({"message": "Logo successfully uploaded!","StorageID" : new_id})

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
# handling of image file path insertion
def save_Image_Path(save_path, timestamp):
    cursor = mysql.connection.cursor()

    # insert new row of Path
    cursor.execute('''
        INSERT INTO logo(Logo_Storage_Path, Storage_Time)
        VALUES (%s,%s)''', (save_path, timestamp))
    mysql.connection.commit()
    
    # fetch its ID:
    cursor.execute('SELECT LAST_INSERT_ID() AS new_id')
    result = cursor.fetchone()
    new_id = result['new_id']
    
    # commit and close cursor
    cursor.close()
    
    return new_id

# route used to fetch path saved on certain image:
@app.route("/getStoragePath", methods = ["GET"])
def get_storage_path():
    try:
        storage_id = request.args.get("StorageID")
        cursor = mysql.connection.cursor()

        # fetch the storage path
        cursor.execute('SELECT Logo_Storage_Path FROM Logo WHERE Logo_ID = %s', (storage_id,))
        mysql.connection.commit()
        result = cursor.fetchone()
        storage_path = result['Logo_Storage_Path']
        converted_path = convert_path(storage_path)
    
        # close cursor
        cursor.close()
        return jsonify({"message": "Storage path retrieved", "Logo_Storage_Path": converted_path})
    
    except Exception as e:
        return jsonify({"error": e}), 500

# Converting the storage adaptive for the web browser to retrieve the stored image:
def convert_path(storage_path):
    # locate the base directory based on the current script's location in the system:
    current_script_directory = os.path.dirname(os.path.abspath(__file__))
    
    # Normalize storage path:
    file_path = os.path.normpath(storage_path)

    # Make the directory relative to the server and convert to web URLs
    relative_path = os.path.relpath(file_path, current_script_directory)
    relative_path = relative_path.replace(os.path.sep, "/")
    return relative_path

# enable debugging, assuming a development environment
if __name__ == '__main__':
    app.run(debug=True)