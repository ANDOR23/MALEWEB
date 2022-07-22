from typing import Text
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.orm import query
from werkzeug.security import generate_password_hash
from werkzeug import Response
from flask_cors import CORS
from werkzeug.wrappers import response
import json

correo = ""
hashing = ""


app = Flask(__name__)
#CORS(app)
#cors = 
CORS(app, resources={
    r"/*": {
        "origins": "http://127.0.0.1:5500"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost:3306/NewsletterUsers'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    hash = db.Column(db.String(32), nullable=False)
    active = db.Column(db.Boolean, default=False, nullable=False)

    def __init__(self, email, hash, active):
        self.email = email
        self.hash = hash
        self.active = active

db.create_all()

#CORS(app,resources={r"/postUser": {"origins": "localhost:5500/"}})


@app.route('/postUser', methods=['POST'])
def insertUser():
    data = request.get_json(force=True)
    email = data['email']
    hashCode = generate_password_hash(email, method='md5')
    newUser = User(email, hash=hashCode, active=0)

    db.session.add(newUser)
    db.session.commit()    
    return jsonify({'Message':'Sign up Succesfull!'})


#SELECT * FROM user ORDER BY id DESC LIMIT 1; 

@app.route('/getUser', methods=['GET'])
def obtainUser():
    sql = 'SELECT * FROM user ORDER BY id DESC LIMIT 1;'
    result = db.engine.execute(sql)
    datos = [dict(row) for row in result]
    for row in result:
        datos.append(row)
    #simon = json.dumps(datos)
    return jsonify(datos)
    
@app.route('/verify/<email>/<hash>',methods=['PUT'])
def updateUser(email, hash):
    query = "UPDATE User SET active='1' WHERE email='" + email + "' AND " + " hash='" + hash + "';"
    db.engine.execute(query)
    return jsonify({'mensaje':'aypopis'})


@app.route('/', methods=['GET'])
def index():
    return jsonify({'mensaje':'simonjajajaja'})

if __name__=="__main__":
    app.run(debug=True)