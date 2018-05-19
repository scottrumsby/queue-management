from flask import request, jsonify, g
from flask_login import current_user
from flask_restplus import Resource
from flask_socketio import emit
from sqlalchemy import text, exc
from qsystem import api, db

from app.auth import login_required
from app.models import Client

import logging

@api.route("/clients/")
class ClientList(Resource):

    @api.marshal_with(Client.model)
    @login_required
    def get(self):
        try:
            clients = Client.query.all()
            return clients, 200
        except exc.SQLAlchemyError as e:
            print(e)
            return {"message": "api is down"}, 500

    @api.marshal_with(Client.model)
    @login_required
    def post(self, data):
        json_input = request.get_json()
        name = json_input.get('name', None)
        office_id = json_input.get('office_id', None)

        if name == None:
            return {"message": "name is required"}, 400

        try:
            client = Client(name=name, office_id=current_user.office_id)
            db.session.add(client)

            emit('update_customer_list', {})
            return client, 201
        except exc.SQLAlchemyError as e:
            print(e)
            return {"message": "api is down"}, 500 

@api.route("/clients/<int:id>/")
class ClientDetail(Resource):
    
    @api.marshal_with(Client.model)
    @login_required
    def get(self, id):
        try:
            client = Client.query.filter_by(id=id).first()

            emit('update_customer_list', {})
            return client, 200
        except exc.SQLAlchemyError as e:
            print(e)
            return {"message": "api is down"}, 500

    @login_required
    def destroy(self, id):
        try:
            client = Client.query.filter_by(id=id).first().delete()

            emit('update_customer_list', {})
            return '', 204
        except exc.SQLAlchemyError as e:
            print(e)
            return {"message": "api is down"}, 500