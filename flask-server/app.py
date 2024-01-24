# This file manages the server used to process the back-end application process of the uploaded images

from flask import Flask, render_template
app = Flask (__name__)

# root decorator
@app.route("/")
def home():
    return render_template("home.html")

# enable debugging, assuming a development environment
if __name__ == '__main__':
    app.run(debug=True)
